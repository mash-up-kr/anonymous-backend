import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAbuseReportDto } from './dto/create-abuse-report.dto';
import { ReviewService } from '../review/review.service';
import { CommentsService } from '../comments/comments.service';
import { AbuseReport, AbuseType, Status } from '../../entities/abuse-report.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class AbuseReportService {
  constructor(
    @InjectRepository(AbuseReport)
    private readonly abuseReportRepository: Repository<AbuseReport>,
    private readonly reviewService: ReviewService,
    private readonly commentService: CommentsService,
  ) {}

  async create(
    user: User,
    createabuseReportDto: CreateAbuseReportDto,
  ): Promise<AbuseReport> {
    const { type, targetId } = createabuseReportDto;

    const _abuseReport = await this.abuseReportRepository.findOne({ user, type, targetId });
    if (_abuseReport) throw new BadRequestException('this abuse report is already exist');

    if (type === AbuseType.Review) {
      const review = await this.reviewService.findOne(targetId);
      if (!review) throw new NotFoundException();
      await this.reviewService.upsertReportUserIds(review.id, user.id);
    } else if (type === AbuseType.Reply) {
      const comment = await this.commentService.findOne(targetId);
      if (!comment) throw new NotFoundException();
      await this.commentService.upsertReportUserIds(comment.id, user.id);
    }

    const abuseReport = this.abuseReportRepository.create({
      user,
      type,
      targetId,
    });
    await this.abuseReportRepository.save(abuseReport);

    return abuseReport;
  }

  async findAll(): Promise<AbuseReport[]> {
    return this.abuseReportRepository.find();
  }

  async findOne(id: number) {
    const abuseReport = await this.abuseReportRepository.findOne(id);
    if (!abuseReport) {
      throw new NotFoundException();
    }
    if (abuseReport.type === 'review') {
      const review = this.reviewService.findOne(abuseReport.targetId);
      return { ...abuseReport, review };
    } else if (abuseReport.type === 'comment') {
      const comment = this.commentService.findOne(abuseReport.targetId);
      return { ...abuseReport, comment };
    }
  }

  async update(id: number, status: Status) {
    const abuseReport = await this.abuseReportRepository.findOne(id);
    if (!abuseReport) {
      throw new NotFoundException();
    }
    abuseReport.status = status;
    return await this.abuseReportRepository.save(abuseReport);
  }

  async remove(user: User, id: number): Promise<void> {
    const abuseReport = await this.abuseReportRepository.findOne(id);
    if (!abuseReport) {
      throw new NotFoundException();
    }

    if (abuseReport.type === AbuseType.Review) {
      const review = await this.reviewService.findOne(abuseReport.targetId);
      if (!review) throw new NotFoundException();
      await this.reviewService.deleteReportUserIds(review.id, user.id);
    } else if (abuseReport.type === AbuseType.Reply) {
      const comment = await this.commentService.findOne(abuseReport.targetId);
      if (!comment) throw new NotFoundException();
      await this.commentService.deleteReportUserIds(comment.id, user.id);
    }

    await this.abuseReportRepository.remove(abuseReport);
  }
}

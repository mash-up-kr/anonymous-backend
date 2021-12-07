import { Injectable, NotFoundException } from '@nestjs/common';
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

    const abuseReport = this.abuseReportRepository.create({
      user,
      type,
      targetId,
    });
    await this.abuseReportRepository.save(abuseReport);

    if (type === AbuseType.Reply) {
      await this.commentService.updateAbuseCount(targetId, 1);
    } else if (type === AbuseType.Review) {
      await this.reviewService.updateAbuseCount(targetId, 1);
    }

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

  async remove(id: number): Promise<void> {
    const abuseReport = await this.abuseReportRepository.findOne(id);
    if (!abuseReport) {
      throw new NotFoundException();
    }

    await this.abuseReportRepository.remove(abuseReport);

    if (abuseReport.type === AbuseType.Reply) {
      await this.commentService.updateAbuseCount(abuseReport.targetId, -1);
    } else if (abuseReport.type === AbuseType.Review) {
      await this.reviewService.updateAbuseCount(abuseReport.targetId, -1);
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAbuseReportDto } from './dto/create-abusereport.dto';
import { ReviewService } from '../review/review.service';
import { CommentsService } from '../comments/comments.service';
import { AbuseReport, Status } from '../../entities/abusereport.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class AbusereportService {
  constructor(
    @InjectRepository(AbuseReport)
    private readonly abusereportRepository: Repository<AbuseReport>,
    private readonly reviewService: ReviewService,
    private readonly commentService: CommentsService,
  ) {}

  async create(
    user: User,
    createabuseReportDto: CreateAbuseReportDto,
  ): Promise<AbuseReport> {
    const { type, targetId } = createabuseReportDto;

    const abusereport = this.abusereportRepository.create({
      user,
      type,
      targetId,
    });
    await this.abusereportRepository.save(abusereport);

    return abusereport;
  }

  async findAll(): Promise<AbuseReport[]> {
    return this.abusereportRepository.find();
  }

  async findOne(id: number) {
    const abusereport = await this.abusereportRepository.findOne(id);
    if (!abusereport) {
      throw new NotFoundException();
    }
    if (abusereport.type === 'review') {
      const review = this.reviewService.findOne(abusereport.targetId);
      return { ...abusereport, review };
    } else if (abusereport.type === 'comment') {
      const comment = this.commentService.findOne(abusereport.targetId);
      return { ...abusereport, comment };
    }
  }

  async update(id: number, status: Status) {
    const abusereport = await this.abusereportRepository.findOne(id);
    if (!abusereport) {
      throw new NotFoundException();
    }
    abusereport.status = status;
    return await this.abusereportRepository.save(abusereport);
  }

  async remove(id: number): Promise<void> {
    const abusereport = await this.abusereportRepository.findOne(id);
    if (!abusereport) {
      throw new NotFoundException();
    }

    await this.abusereportRepository.remove(abusereport);
  }
}

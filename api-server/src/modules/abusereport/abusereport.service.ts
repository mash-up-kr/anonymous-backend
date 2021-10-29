import {
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbuseReport, Status} from 'src/entities/abusereport.entity';
import { CreateAbuseReportDto } from './dto/create-abusereport.dto';
import { ReviewService } from '../review/review.service';
import { CommentsService } from '../comments/comments.service';

@Injectable()
export class AbusereportService {
  constructor(
    @InjectRepository(AbuseReport)
    private readonly abusereportRepository: Repository<AbuseReport>,
    private readonly reviewService: ReviewService,
    private readonly commentService: CommentsService
  ) {}

  async create({ type, targetId }: CreateAbuseReportDto) {
    const abusereport = await this.abusereportRepository.create({
      type,
      targetId
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
    if (abusereport.type === 'review'){
      const review = this.reviewService.findOne(abusereport.targetId)
      return { ...abusereport, review }
    }
    else if(abusereport.type === 'comment'){
      const comment = this.commentService.findOne(abusereport.targetId)
      return { ...abusereport, comment }
    }
  }

  async update(id: number ,status: Status) {
    const abusereport = await this.abusereportRepository.findOne(id);
    if (!abusereport) {
      throw new NotFoundException();
    }
    abusereport.status= status;
    return await this.abusereportRepository.save(abusereport)
  }

  async remove(id: number): Promise<void> {
    const abusereport = await this.abusereportRepository.findOne(id);
    if (!abusereport) {
      throw new NotFoundException();
    }

    await this.abusereportRepository.remove(abusereport);
  }
}

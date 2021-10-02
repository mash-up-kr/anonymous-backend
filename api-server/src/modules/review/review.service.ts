import { KeywordService } from '../keyword/keyword.service';
import { Review } from '../../entities/review.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly keywordService: KeywordService,
  ) {}

  async create({ hole, content, keywords }: CreateReviewDto) {
    const review = await this.reviewRepository.create({
      hole,
      content,
    });
    review.keywords = keywords
      ? (
          await Promise.all(
            keywords.map(async (id) => await this.keywordService.findOne(id)),
          )
        ).filter((v) => v)
      : [];

    await this.reviewRepository.save(review);

    return review;
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async findOne(id: number): Promise<Review> {
    if (isNaN(id)) {
      throw new BadRequestException();
    }

    const review = await this.reviewRepository.findOne(id, {
      relations: ['keywords'],
    });
    if (!review) {
      throw new NotFoundException();
    }
    return review;
  }

  async update(id: number, { hole, content, keywords }: UpdateReviewDto) {
    const review = await this.reviewRepository.findOne(id);
    if (!review) {
      throw new NotFoundException();
    }

    return await this.reviewRepository.save({
      ...review,
      hole,
      content,
      keywords: keywords
        ? (
            await Promise.all(
              keywords.map(async (id) => await this.keywordService.findOne(id)),
            )
          ).filter((v) => v)
        : undefined,
    });
  }

  async remove(id: number): Promise<void> {
    const review = await this.reviewRepository.findOne(id);
    if (!review) {
      throw new NotFoundException();
    }

    await this.reviewRepository.remove(review);
  }
}

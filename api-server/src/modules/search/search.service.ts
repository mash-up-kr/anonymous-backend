import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Hole, Review } from 'src/entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async searchReview(options: IPaginationOptions, hole?: Hole) {
    const queryBuilder = this.reviewRepository.createQueryBuilder('review');

    queryBuilder.orderBy('review.updated_at', 'DESC');

    if (hole != null) {
      queryBuilder.where(`review.hole = :hole`, { hole });
    }

    return paginate<Review>(queryBuilder, options);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Hole, Review } from 'src/entities/review.entity';
import { Repository } from 'typeorm';

interface SearchOption {
  hole?: Hole;
  userId?: string;
}

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async searchReview(pagination: IPaginationOptions, search: SearchOption) {
    const queryBuilder = this.reviewRepository.createQueryBuilder('review');

    queryBuilder
      .select([
        'review',
        'user.nickname',
        'user.id',
        'user.profileImage',
        'app.name',
        'app.id',
        'app.id',
        'app.iconUrl',
        'likes.id',
        'comments.id',
        'like_user.id',
      ])
      .orderBy('review.updated_at', 'DESC')
      .leftJoin('review.app', 'app')
      .leftJoin('review.user', 'user')
      .leftJoin('review.likes', 'likes')
      .leftJoin('review.comments', 'comments')
      .leftJoin('likes.user', 'like_user');

    if (search.hole != null) {
      queryBuilder.where(`review.hole = :hole`, { hole: search.hole });
    }
    if (search.userId != null) {
      queryBuilder.where(`review.user_id = :userId`, { userId: search.userId });
    }

    return paginate<Review>(queryBuilder, pagination);
  }
}

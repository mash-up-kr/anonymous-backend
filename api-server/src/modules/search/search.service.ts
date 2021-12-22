import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { JwtUser } from 'src/entities/user.entity';
import { App } from 'src/entities/app.entity';
import { Hole, Review } from 'src/entities/review.entity';
import { Repository } from 'typeorm';
import { AppService } from '../app/app.service';

interface SearchOption {
  hole?: Hole;
  userId?: string;
}

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly appService: AppService,
  ) {}

  async searchReview({ id: userId }: JwtUser, pagination: IPaginationOptions, search: SearchOption) {
    const queryBuilder = this.reviewRepository.createQueryBuilder('review');

    queryBuilder
      .select([
        'review',
        'user.nickname',
        'user.id',
        'user.profileImage',
        'app.name',
        'app.id',
        'app.iconUrl',
        'likes.id',
        'comments',
        'like_user.id',
      ])
      .orderBy('review.updated_at', 'DESC')
      .leftJoin('review.app', 'app')
      .leftJoin('review.user', 'user')
      .leftJoin('review.likes', 'likes')
      .leftJoinAndSelect('review.hashtags', 'hashtags')
      .leftJoin(
        'review.comments',
        'comments',
        `FIND_IN_SET(:userId, comments.report_user_ids) = 0
          AND LENGTH(comments.report_user_ids) - LENGTH(REPLACE(comments.report_user_ids, ",", "")) < 4`,
        { userId },
      )
      .leftJoin('likes.user', 'like_user')
      .leftJoinAndSelect(
        'comments.children',
        'children',
        `FIND_IN_SET(:userId, children.report_user_ids) = 0
          AND LENGTH(children.report_user_ids) - LENGTH(REPLACE(children.report_user_ids, ",", "")) < 4`,
        { userId },
      )
      .loadRelationCountAndMap('comments.childrenCount', 'comments.children')
      .where('comments.parentId is null')
      .andWhere('FIND_IN_SET(:userId, review.report_user_ids) = 0', { userId })
      .andWhere('LENGTH(review.report_user_ids) - LENGTH(REPLACE(review.report_user_ids, ",", "")) < 4');

    if (search.hole) {
      queryBuilder.andWhere(`review.hole = :hole`, { hole: search.hole });
    }

    if (search.userId) {
      queryBuilder.andWhere(`review.user_id = :userId`, {
        userId: search.userId,
      });
    }

    return paginate<Review>(queryBuilder, pagination);
  }

  async searchApp(query: string): Promise<Pagination<App>> {
    const items = this.appService.searchByNameFromCache(query);
    return {
      items,
      links: {},
      meta: {
        currentPage: 0,
        itemCount: items.length,
        totalItems: items.length,
        itemsPerPage: 20,
        totalPages: 1,
      },
    };
  }
}

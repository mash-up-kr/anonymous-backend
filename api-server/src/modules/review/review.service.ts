import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewLike } from 'src/entities/review-likes.entity';
import { JwtUser } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Review } from '../../entities/review.entity';
import { AppService } from '../app/app.service';
import { HashtagService } from '../hashtag/hashtag.service';
import { UserService } from '../user/user.service';
import { CreateReviewlikeDto } from './dto/create-review-likes.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(ReviewLike)
    private readonly reviewLikeRepository: Repository<ReviewLike>,
    private readonly hashtagService: HashtagService,
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  async create(
    { hole, content, hashtags, appName, appIconUrl }: CreateReviewDto,
    { id: userId }: JwtUser,
  ) {
    const user = await this.userService.findOneById(userId);
    const app = await this.appService.upsert(appName, appIconUrl);
    const review = this.reviewRepository.create({
      hole,
      content,
      app,
      user,
    });

    review.hashtags = hashtags
      ? (
          await Promise.all(
            hashtags.map(
              async (name) => await this.hashtagService.findOneByName(name),
            ),
          )
        ).filter((v) => v)
      : [];

    // TODO: transaction?
    await this.appService.updateAppReviewCount(appName, hole, 1);
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

    const review = await this.reviewRepository
      .createQueryBuilder('review')
      .select([
        'review',
        'app.name',
        'app.id',
        'app.iconUrl',
        'comment_user.id',
        'comment_user.nickname',
        'comment_user.profileImage',
        'like_user.id',
        'like_user.nickname',
      ])
      .leftJoin('review.app', 'app')
      .leftJoinAndSelect('review.hashtags', 'hashtags')
      .leftJoinAndSelect('review.likes', 'likes')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.comments', 'comments')
      .leftJoin('comments.user', 'comment_user')
      .leftJoin('likes.user', 'like_user')
      .leftJoinAndSelect('comments.children', 'children')
      .loadRelationCountAndMap('comments.childrenCount', 'comments.children')
      .where('review.id = :id', { id })
      .andWhere('comments.parentId is null')
      .getOne();

    if (!review) {
      throw new NotFoundException();
    }

    return review;
  }

  async update(
    id: number,
    { hole, content, hashtags }: UpdateReviewDto,
    { id: userId }: JwtUser,
  ) {
    const review = await this.reviewRepository.findOne(id, {
      relations: ['app'],
    });
    if (!review) {
      throw new NotFoundException();
    }
    if (review.user.id !== userId) {
      throw new ForbiddenException(`Cannot update other user's review`);
    }

    // TODO: transaction?
    const updated = await this.reviewRepository.save({
      ...review,
      hole,
      content,
      hashtags: hashtags
        ? (
            await Promise.all(
              hashtags.map(
                async (name) => await this.hashtagService.findOneByName(name),
              ),
            )
          ).filter((v) => v)
        : undefined,
    });

    await this.appService.changeReviewHole(review.app.name, hole);

    return updated;
  }

  async remove(id: number, { id: userId }: JwtUser): Promise<boolean> {
    const review = await this.reviewRepository.findOne(id, {
      relations: ['user', 'app'],
    });
    if (!review) {
      throw new NotFoundException();
    }
    if (review.user.id !== userId) {
      throw new ForbiddenException(`Cannot delete other user's review`);
    }

    // TODO: transaction?
    const result = await this.reviewRepository.softDelete(id);
    await this.appService.updateAppReviewCount(
      review.app.name,
      review.hole,
      -1,
    );
    return result.affected === 1;
  }

  async likeReview({ reviewId }: CreateReviewlikeDto, { id: userId }: JwtUser) {
    const user = await this.userService.findOneById(userId);
    const review = await this.reviewRepository.findOne(reviewId);
    if (!review) {
      throw new NotFoundException();
    }
    const reviewlike = this.reviewLikeRepository.create({ review, user });
    await this.reviewLikeRepository.save(reviewlike);
  }

  async deletelikeReview(id: number, { id: userId }: JwtUser): Promise<void> {
    const review = await this.reviewRepository.findOne(id);
    const user = await this.userService.findOneById(userId);
    const alreadyLike = await this.reviewLikeRepository.findOne({
      review,
      user,
    });
    if (alreadyLike) {
      await this.reviewLikeRepository.remove(alreadyLike);
    } else {
      throw new ForbiddenException(`No alreadylike`);
    }
  }
}

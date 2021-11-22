import { KeywordService } from '../keyword/keyword.service';
import { Review } from '../../entities/review.entity';
import { AppService } from '../app/app.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtUser, User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly keywordService: KeywordService,
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  async create(
    { hole, content, keywords, appName, appIconUrl }: CreateReviewDto,
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

    review.hashtags = keywords
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

    const review = await this.reviewRepository
      .createQueryBuilder('review')
      .select([
        'review',
        'app.name',
        'app.id',
        'app.iconUrl',
        'comment_user.id',
        'comment_user.nickname',
        'like_user.id',
        'like_user.nickname',
      ])
      .leftJoin('review.app', 'app')
      .leftJoinAndSelect('review.keywords', 'keywords')
      .leftJoinAndSelect('review.likes', 'likes')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.comments', 'comments')
      .leftJoin('comments.user', 'comment_user')
      .leftJoin('likes.user', 'like_user')
      .where('review.id = :id', { id })
      .getOne();

    if (!review) {
      throw new NotFoundException();
    }

    return review;
  }

  async update(
    id: number,
    { hole, content, keywords }: UpdateReviewDto,
    { id: userId }: JwtUser,
  ) {
    const review = await this.reviewRepository.findOne(id);
    if (!review) {
      throw new NotFoundException();
    }
    if (review.user.id !== userId) {
      throw new ForbiddenException(`Cannot update other user's review`);
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

  async remove(id: number, { id: userId }: JwtUser): Promise<void> {
    const review = await this.reviewRepository.findOne(id);
    if (!review) {
      throw new NotFoundException();
    }
    if (review.user.id !== userId) {
      throw new ForbiddenException(`Cannot delete other user's review`);
    }

    await this.reviewRepository.remove(review);
  }
}

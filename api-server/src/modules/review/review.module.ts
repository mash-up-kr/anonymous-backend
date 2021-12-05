import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewLike } from 'src/entities/review-likes.entity';
import { Review } from '../../entities/review.entity';
import { AppModule } from '../app/app.module';
import { HashtagModule } from '../hashtag/hashtag.module';
import { UserModule } from '../user/user.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, ReviewLike]),
    HashtagModule,
    AppModule,
    UserModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}

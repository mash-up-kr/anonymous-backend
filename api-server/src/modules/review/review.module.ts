import { HashtagModule } from '../hashtag/hashtag.module';
import { Review } from '../../entities/review.entity';
import { AppModule } from '../app/app.module';
import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ReviewLike } from 'src/entities/review-likes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review,ReviewLike]),
    HashtagModule,
    AppModule,
    UserModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}

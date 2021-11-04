import { KeywordModule } from '../keyword/keyword.module';
import { Review } from '../../entities/review.entity';
import { AppModule } from '../app/app.module';
import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { LikesModule } from '../likes/likes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    KeywordModule,
    AppModule,
    UserModule,
    LikesModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}

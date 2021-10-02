import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { KeywordModule } from 'src/modules/keyword/keyword.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), KeywordModule],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}

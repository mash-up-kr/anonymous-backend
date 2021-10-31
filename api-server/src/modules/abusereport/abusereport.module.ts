import { AbuseReport } from '../../entities/abusereport.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbusereportService } from './abusereport.service';
import { AbusereportController } from './abusereport.controller';
import { ReviewModule } from '../review/review.module';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AbuseReport]),
    ReviewModule,
    CommentsModule,
  ],
  controllers: [AbusereportController],
  providers: [AbusereportService],
})
export class AbuseReportModule {}

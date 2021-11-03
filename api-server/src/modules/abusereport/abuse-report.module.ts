import { AbuseReport } from '../../entities/abuse-report.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbuseReportService } from './abuse-report.service';
import { AbuseReportController } from './abuse-report.controller';
import { ReviewModule } from '../review/review.module';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AbuseReport]),
    ReviewModule,
    CommentsModule,
  ],
  controllers: [AbuseReportController],
  providers: [AbuseReportService],
})
export class AbuseReportModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbusereportService } from './abusereport.service';
import { AbusereportController } from './abusereport.controller';
import { AbuseReport } from 'src/entities/abusereport.entity';
import { ReviewModule } from '../review/review.module';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [TypeOrmModule.forFeature([AbuseReport]),ReviewModule,CommentsModule],
  controllers: [AbusereportController],
  providers: [AbusereportService],
})
export class AbuseReportModule {}

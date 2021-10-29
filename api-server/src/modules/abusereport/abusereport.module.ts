import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbusereportService } from './abusereport.service';
import { AbusereportController } from './abusereport.controller';
import { AbuseReport } from 'src/entities/abusereport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AbuseReport])],
  controllers: [AbusereportController],
  providers: [AbusereportService],
})
export class ReviewModule {}

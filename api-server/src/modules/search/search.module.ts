import { Review } from '../../entities/review.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}

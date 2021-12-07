import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../../entities/review.entity';
import { AppModule } from '../app/app.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), AppModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}

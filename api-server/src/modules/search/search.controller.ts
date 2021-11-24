import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Hole, Review } from 'src/entities/review.entity';
import { SearchService } from './search.service';
import { docs } from './search.docs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('review')
  @docs.searchReview('리뷰 피드 요청 API')
  async searchReview(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('userId') userId?: string,
    @Query('hole') hole?: Hole,
  ): Promise<Pagination<Review>> {
    return await this.searchService.searchReview(
      { page, limit },
      { userId, hole },
    );
  }
}

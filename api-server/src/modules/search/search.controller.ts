import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AuthUser } from 'src/core/decorators/auth-user.decorator';
import { Hole, Review } from 'src/entities/review.entity';
import { JwtUser } from 'src/entities/user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { SearchService } from './search.service';
import { docs } from './search.docs';
import { ApiTags } from '@nestjs/swagger';
import { App } from 'src/entities/app.entity';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('review')
  @UseGuards(JwtAuthGuard)
  @docs.searchReview('리뷰 피드 요청 API')
  async searchReview(
    @AuthUser() user: JwtUser,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('userId') userId?: string,
    @Query('hole') hole?: Hole,
  ): Promise<Pagination<Review>> {
    return await this.searchService.searchReview(
      user,
      { page, limit },
      { userId, hole },
    );
  }

  @Get('app')
  @docs.searchApp('App 검색 API')
  async searchApp(@Query('q') query: string): Promise<Pagination<App>> {
    return await this.searchService.searchApp(query);
  }
}

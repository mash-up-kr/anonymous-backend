import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags } from '@nestjs/swagger';
import { docs } from './review.docs';

@ApiTags('reviews')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @docs.create('리뷰 생성')
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewService.create(createReviewDto);
  }

  @Get()
  @docs.findAll('리뷰 목록 조회')
  async findAll() {
    return await this.reviewService.findAll();
  }

  @Get(':id')
  @docs.findOne('단일 리뷰 조회')
  async findOne(@Param('id') id: string) {
    return await this.reviewService.findOne(+id);
  }

  @Patch(':id')
  @docs.update('리뷰 수정')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return await this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @docs.remove('리뷰 삭제')
  async remove(@Param('id') id: string) {
    return await this.reviewService.remove(+id);
  }
}

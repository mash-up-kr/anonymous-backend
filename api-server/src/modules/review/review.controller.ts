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
  @docs.create('리뷰를 작성합니다.')
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewService.create(createReviewDto);
  }

  @Get()
  @docs.findAll('리뷰 목록을 조회합니다.')
  async findAll() {
    return await this.reviewService.findAll();
  }

  @Get(':id')
  @docs.findOne('id에 해당하는 리뷰를 조회합니다.')
  async findOne(@Param('id') id: string) {
    return await this.reviewService.findOne(+id);
  }

  @Patch(':id')
  @docs.update('id에 해당하는 리뷰를 수정합니다.')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return await this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @docs.remove('id에 해당하는 리뷰를 삭제합니다.')
  async remove(@Param('id') id: string) {
    return await this.reviewService.remove(+id);
  }
}

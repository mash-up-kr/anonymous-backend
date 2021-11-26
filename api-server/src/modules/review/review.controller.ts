import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Put
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/core/decorators/auth-user.decorator';
import { JwtUser } from 'src/entities/user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { docs } from './review.docs';
import { ReviewService } from './review.service';
import { CreateReviewlikeDto } from './dto/create-review-likes.dto';

@ApiTags('reviews')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @docs.create('리뷰 생성')
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @AuthUser() user: JwtUser,
  ) {
    return await this.reviewService.create(createReviewDto, user);
  }

  @Get(':id')
  @docs.findOne('단일 리뷰 조회')
  async findOne(@Param('id') id: string) {
    return await this.reviewService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @docs.update('리뷰 수정')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @AuthUser() user: JwtUser,
  ) {
    return await this.reviewService.update(+id, updateReviewDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @docs.remove('리뷰 삭제')
  async remove(@Param('id') id: string, @AuthUser() user: JwtUser) {
    return await this.reviewService.remove(+id, user);
  }

  @Post('/like')
  @UseGuards(JwtAuthGuard)
  @docs.likeReview('리뷰 좋아요')
  async likeReview(@Body() createReviewlikeDto: CreateReviewlikeDto, @AuthUser() user: JwtUser) {
    return this.reviewService.likeReview(createReviewlikeDto, user);
  }

  @Delete(':id/deletelike')
  @UseGuards(JwtAuthGuard)
  @docs.deletelikeReview('리뷰 좋아요 취소')
  async deletelikeReview(@Param('id') id: string, @AuthUser() user: JwtUser) {
    return this.reviewService.deletelikeReview(+id, user);
  }
}
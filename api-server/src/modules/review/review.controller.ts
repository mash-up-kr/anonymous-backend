import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/core/decorators/auth-user.decorator';
import { JwtUser } from 'src/entities/user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { docs } from './review.docs';
import { ReviewService } from './review.service';
import { AuthorizedRequest } from '../auth/dto/sign-up.dto';
import { LikesService } from '../likes/likes.service';

@ApiTags('reviews')
@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly likesService: LikesService,
  ) {}

  @Post()
  @docs.create('리뷰 생성')
  @UseGuards(JwtAuthGuard)
  @docs.create('리뷰 생성')
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @AuthUser() user: JwtUser,
  ) {
    return await this.reviewService.create(createReviewDto, user);
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

  @docs.getLikedUsers('좋아요한 사용자')
  @Get(':id/liked_users')
  getLikedUsers(@Param('id', ParseIntPipe) id: number) {
    return this.likesService.getLikedUsers(id);
  }

  @docs.isLiked('좋아요 여부')
  @Get(':id/likes')
  @UseGuards(JwtAuthGuard)
  isLiked(@Param('id', ParseIntPipe) id: number, @Request() req: AuthorizedRequest) {
    return this.likesService.isLiked(req.user, id);
  }

  @docs.like('좋아요')
  @Post(':id/likes')
  @UseGuards(JwtAuthGuard)
  like(@Param('id', ParseIntPipe) id: number, @Request() req: AuthorizedRequest) {
    return this.likesService.like(id, req.user);
  }

  @docs.unlike('좋아요 취소')
  @Delete(':id/likes')
  @UseGuards(JwtAuthGuard)
  unlike(@Param('id', ParseIntPipe) id: number, @Request() req: AuthorizedRequest) {
    return this.likesService.unlike(id, req.user);
  }
}

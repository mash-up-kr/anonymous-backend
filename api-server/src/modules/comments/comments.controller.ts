import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthorizedRequest } from '../auth/dto/sign-up.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { docs } from './comments.docs';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('댓글')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @docs.create('댓글 달기')
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req: AuthorizedRequest, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(req.user, createCommentDto);
  }

  @docs.findAll('댓글 보기')
  @Get(':review_id')
  findAll(@Param('review_id', ParseIntPipe) id: number) {
    return this.commentsService.findAll(id);
  }

  @docs.update('댓글 수정')
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Request() req: AuthorizedRequest, @Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(req.user, +id, updateCommentDto);
  }

  @docs.remove('댓글 삭제')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Request() req: AuthorizedRequest, @Param('id') id: string) {
    return this.commentsService.remove(req.user, +id);
  }
}

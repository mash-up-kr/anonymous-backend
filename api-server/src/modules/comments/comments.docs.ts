import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../utils/types';
import { Comment } from '../../entities/comment.entity';
import { CommentsController } from './comments.controller';
import { RemoveCommentResponseDto } from './dto/remove-comment.dto';

export const docs: SwaggerMethodDoc<CommentsController> = {
  create(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '댓글을 추가합니다. response엔 user와 comment, review의 정보도 추가로 relation으로 전달됩니다.',
      }),
      ApiCreatedResponse({
        type: Comment,
      }),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
  },
  findAll(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '특정 리뷰의 전체 댓글 목록을 조회합니다.',
      }),
      ApiCreatedResponse({
        type: [Comment],
      }),
    );
  },
  update(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: 'id에 해당하는 댓글 내용을 수정합니다.',
      }),
      ApiCreatedResponse({
        type: Comment,
      }),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
  },
  remove(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: 'id에 해당하는 댓글을 삭제합니다.',
      }),
      ApiCreatedResponse({
        type: RemoveCommentResponseDto,
      }),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
  },
};

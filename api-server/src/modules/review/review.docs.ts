import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ReviewLike } from 'src/entities/review-like.entity';
import { Review } from '../../entities/review.entity';
import { SwaggerMethodDoc } from '../../utils/types';
import { ReviewController } from './review.controller';

export const docs: SwaggerMethodDoc<ReviewController> = {
  create(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '리뷰를 작성합니다.',
      }),
      ApiCreatedResponse({
        type: Review,
      }),
      ApiUnauthorizedResponse({ description: 'Unauthorized' })
    );
  },
  findAll(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '전체 리뷰 목록을 조회합니다.'
      }),
      ApiCreatedResponse({
          type: [Review],
      }),
    );
  },
  findOne(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: 'id에 해당하는 리뷰를 조회합니다.'
      }),
      ApiCreatedResponse({
          type: Review,
      }),
    );
  },
  update(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: 'id에 해당하는 리뷰 내용을 수정합니다.'
      }),
      ApiUnauthorizedResponse({ description: 'Unauthorized' })
    );
  },
  remove(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: 'id에 해당하는 리뷰를 삭제합니다.'
      }),
      ApiCreatedResponse({ description: 'Successfully deleted' }),
      ApiUnauthorizedResponse({ description: 'Unauthorized' })
    );
  },
  getLikedUsers(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '좋아요한 사용자 목록을 확인할 수 있습니다.',
      }),
    );
  },
  isLiked(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '좋아요한 리뷰인지 확인합니다.',
      }),
      ApiBearerAuth(),
      ApiUnauthorizedResponse(),
      ApiOkResponse({
        type: Boolean,
      }),
    );
  },
  like(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiBearerAuth(),
      ApiUnauthorizedResponse(),
      ApiCreatedResponse({
        type: ReviewLike,
      })
    );
  },
  unlike(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiBearerAuth(),
      ApiUnauthorizedResponse(),
      ApiOkResponse(),
    );
  },
};

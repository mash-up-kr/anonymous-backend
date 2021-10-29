import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Review } from '../../entities/review.entity';
import { SwaggerMethodDoc } from '../../utils/types';
import { ReviewController } from './review.controller';

export const docs: SwaggerMethodDoc<ReviewController> = {
  create(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
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
};

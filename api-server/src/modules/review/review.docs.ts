import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../utils/types';
import { ReviewController } from './review.controller';

export const docs: SwaggerMethodDoc<ReviewController> = {
  create(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
    );
  },
  findAll(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
    );
  },
  findOne(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
    );
  },
  update(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
    );
  },
  remove(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
    );
  },
};

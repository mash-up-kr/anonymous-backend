import { SwaggerMethodDoc } from '../../utils/types';
import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HitController } from './hit.controller';
import { CreateHitDto } from './dto/hit.dto';

export const docs: SwaggerMethodDoc<HitController> = {
  createHit(summary: string) {
    return applyDecorators(
      ApiResponse({ status: 401, description: 'Unauthorized' }),
      ApiOperation({
        summary,
        description: '.',
      }),
      ApiCreatedResponse({
        type: CreateHitDto,
      }),
    );
  },
  getAll(summary: string) {
    return applyDecorators(
      ApiResponse({ status: 401, description: 'Unauthorized' }),
      ApiOperation({
        summary,
        description: '.',
      }),
      ApiCreatedResponse({
        type: CreateHitDto,
      }),
    );
  },
};

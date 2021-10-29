import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { SwaggerMethodDoc } from 'src/utils/types';
import { AbuseReport } from 'src/entities/abusereport.entity';
import { AbusereportController } from './abusereport.controller';

export const docs: SwaggerMethodDoc<AbusereportController> = {
  findAll(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiCreatedResponse({
        type: [AbuseReport],
    }),
    );
  },
  findOne(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiCreatedResponse({
        type: AbuseReport,
      }),
    );
  },
  create(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiCreatedResponse({
        type: AbuseReport,
      }),
    );
  },
  update(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiCreatedResponse({
        type: AbuseReport,
      }),
    );
  },
  remove(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiCreatedResponse({
        type: AbuseReport,
      }),
    );
  },
};

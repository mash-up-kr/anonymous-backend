import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../utils/types';
import { AppController } from './app.controller';

export const docs: SwaggerMethodDoc<AppController> = {
  getOne(summary: string) {
    return applyDecorators(
      ApiOperation({ summary }),
      ApiQuery({
        name: 'ratio',
        required: false,
        description: 'true일 경우 ratio를 계산해서 포함시킨다.',
      }),
    );
  },
};

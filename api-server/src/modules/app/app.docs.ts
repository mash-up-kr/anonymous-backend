import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../utils/types';
import { AppController } from './app.controller';

export const docs: SwaggerMethodDoc<AppController> = {
  getOne(summary: string) {
    return applyDecorators(ApiOperation({ summary }));
  },
};

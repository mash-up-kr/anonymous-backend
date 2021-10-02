import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SwaggerMethodDoc } from 'src/utils/types';
import { UserController } from './user.controller';

export const docs: SwaggerMethodDoc<UserController> = {
  getAllUser(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
    );
  },
  getUser(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
    );
  },
  createUser(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
    );
  },
  updateUser(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
    );
  },
  deleteUser(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
    );
  },
};

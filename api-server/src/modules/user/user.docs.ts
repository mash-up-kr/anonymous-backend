import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { SwaggerMethodDoc } from 'src/utils/types';
import { User } from '../../entities/user.entity';
import { DeleteUserResponseDto } from './dto/delete-user.dto';
import { UserController } from './user.controller';

export const docs: SwaggerMethodDoc<UserController> = {
  getAllUser(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiCreatedResponse({
        type: [User],
    }),
    );
  },
  getUser(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiCreatedResponse({
        type: User,
      }),
    );
  },
  createUser(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiCreatedResponse({
        type: User,
      }),
    );
  },
  updateUser(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiCreatedResponse({
        type: User,
      }),
    );
  },
  deleteUser(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiCreatedResponse({
        type: DeleteUserResponseDto,
      }),
    );
  },
};

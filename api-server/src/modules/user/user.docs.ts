import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse, ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../utils/types';
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
  getLikePosts(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '좋아요한 리뷰 목록을 확인할 수 있습니다.',
      }),
      ApiBearerAuth(),
      ApiUnauthorizedResponse(),
    );
  },
};

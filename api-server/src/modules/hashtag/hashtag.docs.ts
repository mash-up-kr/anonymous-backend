import { SwaggerMethodDoc } from '../../utils/types';
import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Hashtag } from '../../entities/hashtag.entity';
import { HashtagController } from './hashtag.controller';

export const docs: SwaggerMethodDoc<HashtagController> = {
  findAll(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '전체 해시태그 목록을 조회합니다.',
      }),
      ApiCreatedResponse({
        type: [Hashtag],
      }),
    );
  },
  findOne(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: 'id에 해당하는 해시태그를 조회합니다.',
      }),
      ApiCreatedResponse({
        type: Hashtag,
      }),
    );
  },
};

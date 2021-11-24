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
  upsert(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '해시태그를 생성하거나, 이름이 같은 해시태그가 이미 존재하면 해당 해시태그를 반환합니다.',
      }),
      ApiCreatedResponse({
        type: Hashtag,
      }),
    );
  },
  remove(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: 'id에 해당하는 해시태그를 삭제합니다.',
      }),
      ApiCreatedResponse({ description: 'Successfully deleted' }),
    );
  },
};

import { SwaggerMethodDoc } from '../../utils/types';
import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Hashtag } from '../../entities/keyword.entity';
import { KeywordController } from './keyword.controller';

export const docs: SwaggerMethodDoc<KeywordController> = {
  findAll(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '전체 키워드 목록을 조회합니다.'
      }),
      ApiCreatedResponse({
        type: [Hashtag],
      })
    );
  },
  findOne(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: 'id에 해당하는 키워드를 조회합니다.'
      }),
      ApiCreatedResponse({
        type: Hashtag,
      })
    );
  },
};

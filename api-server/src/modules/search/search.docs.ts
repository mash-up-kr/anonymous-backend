import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '../../utils/types';
import { SearchController } from './search.controller';

export const docs: SwaggerMethodDoc<SearchController> = {
  searchReview(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: 'Pagination, search option을 사용을 해서 리뷰를 검색한다.',
      }),
      ApiQuery({
        name: 'page',
        required: false,
        description: '불러올 페이지 (defualt 1)',
      }),
      ApiQuery({
        name: 'limit',
        required: false,
        description: '한번에 불러올 목록 갯수 (defualt 10)',
      }),
      ApiQuery({
        name: 'userId',
        required: false,
        description: '유저 아이디로 검색 (없는 경우 유저 상관없이 검색)',
      }),
      ApiQuery({
        name: 'hole',
        required: false,
        description: 'black hole, while hole여부, (없는 경우 전체검색)',
      }),
    );
  },
  searchApp(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: 'name prefix로 app을 검색합니다.',
      }),
      ApiQuery({
        name: 'q',
        required: true,
        description: 'name prefix',
      }),
    );
  },
};

import { Controller, Get, Param } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { docs } from './keyword.docs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('keyword')
@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @docs.findAll('키워드 목록 조회')
  @Get()
  findAll() {
    return this.keywordService.findAll();
  }

  @docs.findOne('단일 키워드 조회')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keywordService.findOne(+id);
  }
}

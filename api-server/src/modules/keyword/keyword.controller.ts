import { Controller, Get, Param } from '@nestjs/common';
import { KeywordService } from './keyword.service';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Get()
  findAll() {
    return this.keywordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keywordService.findOne(+id);
  }
}

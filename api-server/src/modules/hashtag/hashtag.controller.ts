import { Controller, Get, Param, Body, Post, Delete } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { docs } from './hashtag.docs';
import { ApiTags } from '@nestjs/swagger';
import { UpsertHashtagDto } from './dto/upsert-hashtag.dto';

@ApiTags('hashtag')
@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @docs.findAll('해시태그 목록 조회')
  @Get()
  findAll() {
    return this.hashtagService.findAll();
  }

  @docs.findOne('단일 해시태그 조회')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hashtagService.findOne(+id);
  }

  @docs.upsert('해시태그 생성')
  @Post()
  upsert(@Body() upsertHashtagDto: UpsertHashtagDto,) {
    return this.hashtagService.upsert(upsertHashtagDto);
  }

  @docs.remove('해시태그 삭제')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hashtagService.remove(+id);
  }
}

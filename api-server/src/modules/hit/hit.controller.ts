import { Controller, Post, Body ,Get, Query} from '@nestjs/common';
import { HitService } from './hit.service'
import { ApiTags } from '@nestjs/swagger';
import { CreateHitDto } from './dto/hit.dto';
import { docs } from './hit.docs';

@ApiTags('hit')
@Controller('hit')
export class HitController {
    constructor(private readonly hitService: HitService) {}

    @Post()
    @docs.createHit('.')
    async createHit(@Body() dto: CreateHitDto) {
      return this.hitService.createHit(dto);
    }

    @Get()
    @docs.getAll('유저별 시간 조회')
    async getAll(@Query('userId') userId: number) {
      return this.hitService.getAll(userId);
    }

}

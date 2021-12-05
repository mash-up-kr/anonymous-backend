import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { App } from 'src/entities/app.entity';
import { docs } from './app.docs';
import { AppService } from './app.service';

@ApiTags('app')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:name')
  @docs.getOne('find an app by name')
  async getOne(
    @Param('name') name: string,
    @Query('ratio') ratio?: string,
  ): Promise<App> {
    if (ratio) {
      return await this.appService.findOneByNameAndCountRatio(name);
    } else {
      return await this.appService.findOneByName(name);
    }
  }
}

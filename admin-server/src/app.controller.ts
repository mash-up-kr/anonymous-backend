import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('v1/admin')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health(): string {
    return this.appService.health();
  }
}

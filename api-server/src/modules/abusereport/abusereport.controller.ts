import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
import { Status } from 'src/entities/abusereport.entity';
import { AbusereportService } from './abusereport.service';
import { CreateAbuseReportDto } from './dto/create-abusereport.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SlackEvent } from '../slack/slack.event';

@Controller('abusereport')
export class AbusereportController {
  private slackEvent: SlackEvent;

  constructor(
    private readonly abusereportService: AbusereportService,
    private readonly eventEmitter: EventEmitter2,)
    {
      this.slackEvent = new SlackEvent(this.eventEmitter);
    }

  @Post()
  async create(@Body() createAbuseReportDto: CreateAbuseReportDto) {
    const res =  await this.abusereportService.create(createAbuseReportDto);

    this.slackEvent.onAbuseSent({ targetId: createAbuseReportDto.targetId})
    return res;
  }

  @Get()
  async findAll() {
    return await this.abusereportService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string ) {
    return await this.abusereportService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string , status: Status
  ) {
    return await this.abusereportService.update(+id, status);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.abusereportService.remove(+id);
  }
}

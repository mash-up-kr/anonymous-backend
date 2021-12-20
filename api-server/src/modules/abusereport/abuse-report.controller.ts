import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthorizedRequest } from '../auth/dto/sign-up.dto';
import { AbuseReportService } from './abuse-report.service';
import { CreateAbuseReportDto } from './dto/create-abuse-report.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SlackEvent } from '../slack/slack.event';
import { docs } from './abuse-report.docs';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Status } from '../../entities/abuse-report.entity';

@Controller('abuse-report')
export class AbuseReportController {
  private slackEvent: SlackEvent;

  constructor(
    private readonly abusereportService: AbuseReportService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.slackEvent = new SlackEvent(this.eventEmitter);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @docs.create('신고 생성')
  async create(
    @Request() req: AuthorizedRequest,
    @Body() createAbuseReportDto: CreateAbuseReportDto,
  ) {
    const res = await this.abusereportService.create(
      req.user,
      createAbuseReportDto,
    );

    this.slackEvent.onAbuseSent({ targetId: createAbuseReportDto.targetId });
    return res;
  }

  @Get()
  @docs.findAll('신고 목록 조회')
  async findAll() {
    return await this.abusereportService.findAll();
  }

  @Get(':id')
  @docs.findOne('단일 신고 조회')
  async findOne(@Param('id') id: string) {
    return await this.abusereportService.findOne(+id);
  }

  @Patch(':id')
  @docs.update('신고 수정')
  async update(@Param('id') id: string, status: Status) {
    return await this.abusereportService.update(+id, status);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @docs.remove('신고 삭제')
  async remove(
    @Request() req: AuthorizedRequest,
    @Param('id') id: string,
  ) {
    return await this.abusereportService.remove(req.user, +id);
  }
}

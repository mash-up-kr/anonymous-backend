import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SlackListener } from './slack.listener';
import { SlackService } from './slack.service';

@Module({
  imports: [ConfigModule],
  providers: [SlackService, SlackListener],
})
export class SlackModule {}

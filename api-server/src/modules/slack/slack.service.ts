import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IncomingWebhook } from '@slack/webhook';
import is from '@sindresorhus/is';

@Injectable()
export class SlackService {
  private readonly webhook: IncomingWebhook | null;

  constructor(private readonly configService: ConfigService) {
    const webhookUrl = this.configService.get('slack.webhookUrl');
    this.webhook = is.urlString(webhookUrl)
      ? new IncomingWebhook(webhookUrl)
      : null;
  }

  private async maybeSend(
    ...args: Parameters<IncomingWebhook['send']>
  ): Promise<void> {
    if (this.webhook != null) {
      await this.webhook.send(...args);
    }
    return;
  }

  async sendPlainTextToChannel(message: string) {
    this.maybeSend(message);
  }
}

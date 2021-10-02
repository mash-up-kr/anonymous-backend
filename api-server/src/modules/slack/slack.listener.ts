import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailSentEvent, EmailVerifiedEvent } from './eventTypes';
import { SlackService } from './slack.service';

@Injectable()
export class SlackListener {
  constructor(private readonly slackService: SlackService) {}

  @OnEvent('auth.email.sent')
  handleOnEmailSent(payload: EmailSentEvent) {
    this.slackService.sendPlainTextToChannel(
      `verification email is sent: ${payload.email}`,
    );
  }

  @OnEvent('auth.email.verified')
  handleOnEmailVerified(payload: EmailVerifiedEvent) {
    this.slackService.sendPlainTextToChannel(
      `email verified ${payload.verified ? 'success' : 'failure'}: ${
        payload.email
      }`,
    );
  }
}

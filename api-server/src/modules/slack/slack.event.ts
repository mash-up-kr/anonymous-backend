import { EventEmitter2 } from '@nestjs/event-emitter';
import { EmailSentEvent, EmailVerifiedEvent } from './eventTypes';

export class SlackEvent {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  onEmailSent(payload: EmailSentEvent) {
    this.eventEmitter.emit('auth.email.sent', payload);
  }

  onEmailVerified(payload: EmailVerifiedEvent) {
    this.eventEmitter.emit('auth.email.verified', payload);
  }
}

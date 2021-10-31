import { EventEmitter2 } from '@nestjs/event-emitter';
import { EmailSentEvent, EmailVerifiedEvent , AbuseSentEvent} from './eventTypes';

export class SlackEvent {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  onEmailSent(payload: EmailSentEvent) {
    this.eventEmitter.emit('auth.email.sent', payload);
  }

  onEmailVerified(payload: EmailVerifiedEvent) {
    this.eventEmitter.emit('auth.email.verified', payload);
  }

  onAbuseSent(payload: AbuseSentEvent) {
    this.eventEmitter.emit('abuse.sent', payload);
  }
}

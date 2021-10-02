import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { SendEmailDto } from './dto/send-email.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { AuthorizedRequest, SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { docs } from './auth.docs';
import { JwtAuthGuard } from './jwt-auth.guard';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SlackEvent } from '../slack/slack.event';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private slackEvent: SlackEvent;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.slackEvent = new SlackEvent(this.eventEmitter);
  }

  @Post('send-email')
  @docs.sendEmail('회원가입 인증코드 전송')
  async sendEmail(@Body() dto: SendEmailDto) {
    const res = await this.authService.sendEmail(dto);

    this.slackEvent.onEmailSent({ email: dto.email });
    return res;
  }

  @Post('verify-code')
  @docs.verifyCode('인증코드 확인')
  async verifyCode(@Body() dto: VerifyCodeDto) {
    const res = await this.authService.verifyCode(dto);

    this.slackEvent.onEmailVerified({
      email: dto.email,
      verified: res.isVerify,
    });
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Request() req: AuthorizedRequest) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: AuthorizedRequest) {
    const {
      email,
      nickname,
      createdAt,
      updatedAt,
      id,
    } = await this.userService.findOneById(req.user.id);
    return { email, nickname, createdAt, updatedAt, id };
  }
}

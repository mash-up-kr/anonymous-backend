import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import { SlackEvent } from '../slack/slack.event';
import { UserService } from '../user/user.service';
import { docs } from './auth.docs';
import { AuthService } from './auth.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { AuthorizedRequest, SignUpDto } from './dto/sign-up.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ValidateNicknameDto } from './dto/validate-nickname.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LoginAuthGuard } from './guard/login-auth.guard';

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

  @UseGuards(LoginAuthGuard)
  @Post('login')
  @docs.login('로그인')
  async login(@Request() req: AuthorizedRequest) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @docs.signup('회원가입')
  async signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @docs.getProfile('내 정보 가져오기')
  async getProfile(@Request() req: AuthorizedRequest) {
    const user = await this.userService.findOneById(req.user.id);
    delete user.password;
    return user;
  }

  @Post('validate-nickname')
  @docs.validateNickname('닉네임 중복 확인')
  async validateNickname(@Body() dto: ValidateNicknameDto) {
    const res = await this.authService.validateNickname(dto);
    return res;
  }

  @Patch('update-password')
  @docs.updatePassword('새 비밀번호 업데이트')
  async updatePassword(@Body() dto: UpdatePasswordDto) {
    return this.authService.updatePassword(dto);
  }

  @Post('reset-password')
  @docs.resetPassword('패스워드 재설정')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}

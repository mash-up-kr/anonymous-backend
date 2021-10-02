import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendEmailDto } from './dto/send-email.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { AuthService } from './auth.service';
import { docs } from './auth.docs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-email')
  @docs.sendEmail('회원가입 인증코드 전송')
  async sendEmail(@Body() dto: SendEmailDto) {
    const res = await this.authService.sendEmail(dto);
    return res;
  }

  @Post('verify-code')
  @docs.verifyCode('인증코드 확인')
  async verifyCode(@Body() dto: VerifyCodeDto) {
    const res = await this.authService.verifyCode(dto);
    return res;
  }
}

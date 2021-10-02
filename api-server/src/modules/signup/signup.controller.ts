import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendEmailDto } from './dto/send-email.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { SignupService } from './signup.service';
import { docs } from './signup.docs';

@ApiTags('signup')
@Controller('v1/api/signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post('send-email')
  @docs.sendEmail('회원가입 인증코드 전송')
  async sendEmail(@Body() dto: SendEmailDto) {
    const res = await this.signupService.sendEmail(dto);
    return res;
  }

  @Post('verify-code')
  @docs.verifyCode('인증코드 확인')
  async verifyCode(@Body() dto: VerifyCodeDto) {
    const res = await this.signupService.verifyCode(dto);
    return res;
  }
}

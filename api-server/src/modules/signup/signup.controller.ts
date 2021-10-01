import { Body, Controller, Post } from '@nestjs/common';

import { SendEmailDto } from './dto/send-email.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { SignupService } from './signup.service';

@Controller('v1/api/signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post('send-email')
  async sendEmail(@Body() dto: SendEmailDto) {
    const isSend = await this.signupService.sendEmail(dto);
    return isSend;
  }

  @Post('verify-code')
  async verifyCode(@Body() dto: VerifyCodeDto) {
    const isVerify = await this.signupService.verifyCode(dto);
    return isVerify;
  }
}

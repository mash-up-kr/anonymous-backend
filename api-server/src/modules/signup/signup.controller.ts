import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendEmailDto } from './dto/send-email.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { SignupService } from './signup.service';
import { ApiDocs } from './signup.docs';

@ApiTags('Signup')
@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post('send-email')
  @ApiDocs.sendEmail()
  async sendEmail(@Body() dto: SendEmailDto) {
    const res = await this.signupService.sendEmail(dto);
    return res;
  }

  @Post('verify-code')
  @ApiDocs.verifyCode()
  async verifyCode(@Body() dto: VerifyCodeDto) {
    const res = await this.signupService.verifyCode(dto);
    return res;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

import { VerifyCode } from '../../entities/verify-code.entity';
import { User } from '../../entities/user.entity';
import { SendEmailDto, SendEmailResponseDto } from './dto/send-email.dto';
import { VerifyCodeDto, VerifyCodeResponseDto } from './dto/verify-code.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(VerifyCode)
    private verifyCodeRepository: Repository<VerifyCode>,
  ) {}

  async sendEmail({ email }: SendEmailDto): Promise<SendEmailResponseDto> {
    const user = await this.userRepository.findOne({ email });
    if (user) return { isUserExist: true };
    const verifyCode = await this.verifyCodeRepository.findOne({ email });
    if (verifyCode) {
      await this.verifyCodeRepository.remove(verifyCode);
    }
    const newVerifyCode = this.verifyCodeRepository.create({
      code: randomBytes(64).toString('hex').slice(0, 6),
      email,
    });
    await this.verifyCodeRepository.save(newVerifyCode);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'mashup.anonymous',
        pass: process.env.GMAIL_PASS,
      },
    });
    transporter
      .sendMail({
        from: 'mashup.anonymous@gmail.com',
        to: email,
        subject: '어나니머쓱 메일 인증 테스트',
        text: `아래의 코드를 입력해 인증을 완료해 주세요. ${newVerifyCode.code} 이 번호는 30분간 유효합니다.`,
      })
      .catch((err) => {
        this.verifyCodeRepository.remove(newVerifyCode);
        throw new Error(`Error occurred while sending email: ${err}`);
      });
    return { isSend: true };
  }

  async verifyCode({
    email,
    code,
  }: VerifyCodeDto): Promise<VerifyCodeResponseDto> {
    const verifyCode = await this.verifyCodeRepository.findOne({ email, code });
    if (!verifyCode) return { email, isVerify: false };
    if (verifyCode.createdAt.getTime() + 1800000 < new Date().getTime()) {
      await this.verifyCodeRepository.remove(verifyCode);
      return { email, isCodeExpired: true };
    }
    return { email, isVerify: true };
  }
}

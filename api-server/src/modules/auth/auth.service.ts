import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { VerifyCode } from '../../entities/verify-code.entity';
import { UserService } from '../user/user.service';
import { SendEmailDto, SendEmailResponseDto } from './dto/send-email.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { VerifyCodeDto, VerifyCodeResponseDto } from './dto/verify-code.dto';
import { MailSender } from './mail-sender';
import { PasswordHasher } from './password-hasher';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(VerifyCode)
    private verifyCodeRepository: Repository<VerifyCode>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordHasher: PasswordHasher,
    private readonly mailSender: MailSender,
  ) {}

  async sendEmail({ email }: SendEmailDto): Promise<SendEmailResponseDto> {
    const user = await this.userService.findOneByEmail(email);
    if (user) return { isUserExist: true };

    const verifyCode = await this.verifyCodeRepository.findOne({});

    if (verifyCode) {
      await this.verifyCodeRepository.remove(verifyCode);
    }

    const newVerifyCode = this.verifyCodeRepository.create({
      code: generateCode(),
      email,
    });

    await this.verifyCodeRepository.save(newVerifyCode);

    try {
      await this.mailSender.send({
        to: email,
        subject: '어나니머쓱 메일 인증 테스트',
        text: `아래의 코드를 입력해 인증을 완료해 주세요. ${newVerifyCode.code} 이 번호는 30분간 유효합니다.`,
      });
    } catch (e) {
      this.verifyCodeRepository.remove(newVerifyCode);
      throw new Error(`Error occurred while sending email: ${e}`);
    }

    return { isSend: true };

    function generateCode() {
      return Math.floor(Math.random() * 1000000 - 1)
        .toString()
        .padStart(6, '0');
    }
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

  async validateUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user == null) {
      return null;
    }
    if (
      await this.passwordHasher.equal({
        plain: password,
        hashed: user.password,
      })
    ) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { userName: user.nickname, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup({ email, nickname, password }: SignUpDto) {
    const user = await this.userService.createUser({
      email,
      nickname,
      password: await this.passwordHasher.hash(password),
    });

    return {
      access_token: this.jwtService.sign({
        userName: user.nickname,
        sub: user.id,
      }),
    };
  }
}

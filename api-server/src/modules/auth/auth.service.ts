import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { VerifyCode } from '../../entities/verify-code.entity';
import { UserService } from '../user/user.service';
import { MailSender } from './mail-sender';
import { PasswordHasher } from './password-hasher';
import { AuthUser, JwtPayload } from './auth.types';
import {
  SendEmailDto,
  SendEmailResponseDto,
  SignUpDto,
  VerifyCodeDto,
  VerifyCodeResponseDto,
  ValidateNicknameDto,
  ValidateNicknameResponseDto,
  UpdatePasswordDto,
  UpdatePasswordResponseDto,
  LoginResponseDto,
} from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

    const verifyCode = await this.verifyCodeRepository.findOne({ email });

    if (verifyCode) {
      await this.verifyCodeRepository.remove(verifyCode);
    }

    const generateCode = () => {
      return Math.floor(Math.random() * 1000000 - 1)
        .toString()
        .padStart(6, '0');
    };

    const newVerifyCode = this.verifyCodeRepository.create({
      code: generateCode(),
      email,
    });

    await this.verifyCodeRepository.save(newVerifyCode);

    try {
      await this.mailSender.send({
        to: email,
        subject: 'Appilogue 메일 인증',
        text: `아래의 코드를 입력해 인증을 완료해 주세요. ${newVerifyCode.code} 이 번호는 10분간 유효합니다.`,
      });
    } catch (e) {
      this.verifyCodeRepository.remove(newVerifyCode);
      throw new Error(`Error occurred while sending email: ${e}`);
    }

    return { isSend: true };
  }

  async verifyCode({
    email,
    code,
  }: VerifyCodeDto): Promise<VerifyCodeResponseDto> {
    const verifyCode = await this.verifyCodeRepository.findOne({ email, code });
    if (!verifyCode) return { email, isVerify: false };
    if (verifyCode.createdAt.getTime() + 600000 < new Date().getTime()) {
      await this.verifyCodeRepository.remove(verifyCode);
      return { email, isCodeExpired: true };
    }
    this.verifyCodeRepository.remove(verifyCode);
    return { email, isVerify: true };
  }

  async validateNickname({
    nickname,
  }: ValidateNicknameDto): Promise<ValidateNicknameResponseDto> {
    const user = await this.userRepository.findOne({ nickname });
    if (user) return { nickname, isUnique: false };
    return { nickname, isUnique: true };
  }

  async validateUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) return null;
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

  async login(user: AuthUser): Promise<LoginResponseDto> {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup({ email, nickname, password }: SignUpDto) {
    const _user = await this.userService.findOneByEmail(email);
    if (_user) {
      throw new HttpException(
        `Email ${email} is already exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userService.createUser({
      email,
      nickname,
      password: await this.passwordHasher.hash(password),
    });
    delete user.password;
    return user;
  }

  async updatePassword(
    userId: number,
    { newPassword }: UpdatePasswordDto,
  ): Promise<UpdatePasswordResponseDto> {
    await this.userRepository.update(userId, {
      password: await this.passwordHasher.hash(newPassword),
    });
    return { isOk: true };
  }
}

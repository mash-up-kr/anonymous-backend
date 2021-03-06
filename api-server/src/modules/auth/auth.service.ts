import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { VerifyCode } from '../../entities/verify-code.entity';
import { UserService } from '../user/user.service';
import { MailSender } from './mail-sender';
import { PasswordHasher } from './password-hasher';
import { AuthUser, JwtPayload } from './auth.types';
import { generate } from 'generate-password';
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
  ResetPasswordDto,
  ResetPasswordResponseDto,
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

  async sendEmail({
    email,
    allowEmailDuplicate,
  }: SendEmailDto): Promise<SendEmailResponseDto> {
    const user = await this.userService.findOneByEmail(email);
    if (user && !allowEmailDuplicate)
      return { isUserExist: true, isSend: false };
    if (!user && allowEmailDuplicate)
      return { isUserExist: false, isSend: false };

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
        subject: 'Appilogue ?????? ??????',
        text: `????????? ????????? ????????? ????????? ????????? ?????????. ${newVerifyCode.code} ??? ????????? 10?????? ???????????????.`,
      });
    } catch (e) {
      this.verifyCodeRepository.remove(newVerifyCode);
      throw new Error(`Error occurred while sending email: ${e}`);
    }
    return { isSend: true, isUserExist: user !== undefined };
  }

  async verifyCode({
    email,
    code,
  }: VerifyCodeDto): Promise<VerifyCodeResponseDto> {
    const verifyCode = await this.verifyCodeRepository.findOne({ email, code });
    if (!verifyCode) return { email, isVerify: false, isCodeExpired: false };
    if (verifyCode.createdAt.getTime() + 600000 < new Date().getTime()) {
      await this.verifyCodeRepository.remove(verifyCode);
      return { email, isCodeExpired: true, isVerify: false };
    }
    this.verifyCodeRepository.remove(verifyCode);
    return { email, isVerify: true, isCodeExpired: false };
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

    const isEqual = await this.passwordHasher.equal({
      plain: password,
      hashed: user.password,
    });

    if (isEqual) return user;
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
    try {
      const user = await this.userService.createUser({
        email,
        nickname,
        password: await this.passwordHasher.hash(password),
      });
      delete user.password;
      return user;
    } catch (e) {
      if (e.message.includes('Duplicate entry')) {
        throw new BadRequestException(`nickname is duplicated: '${nickname}'`);
      } else {
        throw e;
      }
    }
  }

  async updatePassword({
    email,
    newPassword,
  }: UpdatePasswordDto): Promise<UpdatePasswordResponseDto> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new HttpException(
        `Email ${email} is not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const isEqual = await this.passwordHasher.equal({
      plain: newPassword,
      hashed: user.password,
    });
    if (isEqual) {
      return { isUpdated: false };
    }
    await this.userRepository.update(user, {
      password: await this.passwordHasher.hash(newPassword),
    });
    return { isUpdated: true };
  }

  async resetPassword({
    email,
  }: ResetPasswordDto): Promise<ResetPasswordResponseDto> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new HttpException(
        `Email ${email} is not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPassword = generate({ length: 7, numbers: true });
    await this.mailSender.send({
      to: email,
      subject: 'Appilogue ???????????? ?????????',
      text: `?????? ??????????????? ?????? ?????????????????????. ${newPassword}`,
    });

    await this.userRepository.update(user, {
      password: await this.passwordHasher.hash(newPassword),
    });

    return { hasSent: true };
  }
}

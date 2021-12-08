import { SwaggerMethodDoc } from '../../utils/types';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '../../entities/user.entity';
import { AuthController } from './auth.controller';
import {
  SendEmailResponseDto,
  VerifyCodeResponseDto,
  ValidateNicknameResponseDto,
  UpdatePasswordResponseDto,
  LoginResponseDto,
  LoginDto,
  ResetPasswordDto,
} from './dto';

export const docs: SwaggerMethodDoc<AuthController> = {
  sendEmail(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          '등록된 이메일로 인증코드 여섯자리를 전송합니다. allowEmailDuplicate가 true면 이메일 중복 검사를 하지 않습니다.',
      }),
      ApiCreatedResponse({
        type: SendEmailResponseDto,
        description:
          '성공적으로 전송했다면 isSend: true, 이미 등록된 이메일이라면 isUserExist: true를 반환',
      }),
    );
  },
  verifyCode(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          '유저가 입력한 인증코드가 전송한 코드와 일치하는지 확인합니다.',
      }),
      ApiCreatedResponse({
        type: VerifyCodeResponseDto,
        description:
          '코드가 일치한다면 isVerify: true, 불일치한다면 isVerify: false, 만료된 코드라면 isCodeExpired: true를 반환',
      }),
    );
  },
  validateNickname(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiCreatedResponse({
        type: ValidateNicknameResponseDto,
      }),
    );
  },
  login(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiBody({ type: LoginDto }),
      ApiCreatedResponse({
        type: LoginResponseDto,
      }),
    );
  },
  signup(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '필수값은 하단 body schema탭에 명시되어 있습니다.',
      }),
      ApiCreatedResponse({
        type: User,
      }),
    );
  },
  getProfile(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
      }),
      ApiCreatedResponse({
        type: User,
        description: 'password를 제외한 유저 정보를 조회합니다.',
      }),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
  },
  updatePassword(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
      }),
      ApiCreatedResponse({
        type: UpdatePasswordResponseDto,
        description:
          'isUpdated가 true면 성공적으로 변환, false라면 이전 비밀번호와 중복됨을 의미',
      }),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
  },
  resetPassword(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiCreatedResponse({
        type: ResetPasswordDto,
        description: 'hasSent가 true면 성공적으로 재설정되었음을 의미',
      }),
    );
  },
};

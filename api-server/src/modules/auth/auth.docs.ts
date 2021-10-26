import { SwaggerMethodDoc } from '../../utils/types';
import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyCodeResponseDto } from './dto/verify-code.dto';
import { SendEmailResponseDto } from './dto/send-email.dto';
import { AuthController } from './auth.controller';

export const docs: SwaggerMethodDoc<AuthController> = {
  sendEmail(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '등록된 이메일로 인증코드 여섯자리를 전송합니다.',
      }),
      ApiCreatedResponse({
        type: SendEmailResponseDto,
      }),
    );
  },
  verifyCode(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '유저가 입력한 인증코드가 일치하는지 확인합니다.',
      }),
      ApiCreatedResponse({
        type: VerifyCodeResponseDto,
      }),
    );
  },
  login(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
    );
  },
  signup(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
    );
  },
  getProfile(summary: string) {
    return applyDecorators(
      ApiResponse({ status: 401, description: 'Unauthorized' }),
      ApiOperation({
        summary,
      }),
    );
  },
  refreshToken(summary: string) {
    return applyDecorators(
      ApiResponse({ status: 401, description: 'Unauthorized' }),
      ApiOperation({
        summary,
      }),
    );
  },
};

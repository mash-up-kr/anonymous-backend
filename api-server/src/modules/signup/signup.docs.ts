import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyCodeResponseDto } from './dto/verify-code.dto';
import { SendEmailResponseDto } from './dto/send-email.dto';
import { SignupController } from './signup.controller';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: () => MethodDecorator;
};
export const ApiDocs: SwaggerMethodDoc<SignupController> = {
  sendEmail() {
    return applyDecorators(
      ApiResponse({ status: 401, description: 'Unauthorized' }),
      ApiOperation({
        summary: '회원가입 인증코드 전송',
        description: '등록된 이메일로 인증코드 여섯자리를 전송합니다.',
      }),
      ApiCreatedResponse({
        type: SendEmailResponseDto,
      }),
    );
  },
  verifyCode() {
    return applyDecorators(
      ApiResponse({ status: 401, description: 'Unauthorized' }),
      ApiOperation({
        summary: '인증코드 확인',
        description: '유저가 입력한 인증코드가 일치하는지 확인합니다.',
      }),
      ApiCreatedResponse({
        type: VerifyCodeResponseDto,
      }),
    );
  },
};

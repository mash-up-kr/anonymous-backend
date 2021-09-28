import { IsEmail } from 'class-validator';

export class VerifyCodeDto {
  @IsEmail()
  email: string;
  code: string;
}

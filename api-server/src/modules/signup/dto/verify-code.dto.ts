import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class VerifyCodeDto {
  @IsEmail()
  @ApiProperty({ example: 'mashup.anonymous@gmail.com' })
  email: string;

  @ApiProperty({ example: '1a2b3c' })
  code: string;
}

export class VerifyCodeResponseDto {
  @IsEmail()
  @ApiProperty({ example: 'mashup.anonymous@gmail.com' })
  email: string;

  @ApiPropertyOptional({
    default: false,
    description: 'Optional. 만료된 코드면 true',
  })
  isCodeExpired?: boolean;

  @ApiPropertyOptional({
    description: 'Optional. 코드 일치 여부',
  })
  isVerify?: boolean;
}

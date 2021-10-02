import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({ example: 'mashup.anonymous@gmail.com' })
  @IsEmail()
  email: string;
}

export class SendEmailResponseDto {
  @ApiProperty()
  isSend?: boolean;

  @ApiPropertyOptional({
    default: false,
    description: 'Optional. 유저가 존재하는 경우 true',
  })
  isUserExist?: boolean;
}

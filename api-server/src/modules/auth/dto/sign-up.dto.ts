import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../entities/user.entity';

export type AuthorizedRequest = Request & { user: User };

export class SignUpDto {
  @ApiProperty({ example: 'mashup.anonymous@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  planetType?: string;

  @ApiProperty()
  avatarTypeName?: string;

  @ApiProperty()
  isVerified: boolean;
}

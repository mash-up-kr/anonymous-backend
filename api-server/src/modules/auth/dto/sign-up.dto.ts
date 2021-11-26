import { IsEmail, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../../../entities/user.entity';

export type AuthorizedRequest = Request & { user: User };

export class SignUpDto {
  @IsEmail()
  @ApiProperty({ example: 'mashup.anonymous@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  nickname: string;

  @ApiPropertyOptional()
  planetType?: string;

  @ApiPropertyOptional()
  avatarTypeName?: string;

  @ApiPropertyOptional()
  profileImage?: string;
}

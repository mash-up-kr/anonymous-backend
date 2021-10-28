import { IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @IsString()
  @ApiProperty()
  newPassword: string;
}

export class UpdatePasswordResponseDto {
  @IsBoolean()
  @ApiProperty()
  isOk: boolean;
}

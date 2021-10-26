import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ example: 'qlalfqjsgh486' })
  newPassword: string;
}

export class UpdatePasswordResponseDto {
  @ApiProperty({ description: '변경 완료 되었으면 true', })
  isOk: boolean;
}

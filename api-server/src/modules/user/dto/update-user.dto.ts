import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  nickname?: string;

  @ApiPropertyOptional()
  @IsOptional()
  profileImage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  planetType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  avatarItemType?: string;
}

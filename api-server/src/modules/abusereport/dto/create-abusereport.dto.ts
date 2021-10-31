import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { AbuseType } from '../../../entities/abusereport.entity';

export class CreateAbuseReportDto {
  @IsNotEmpty()
  @IsEnum(AbuseType)
  @ApiProperty({ enum: AbuseType })
  type: AbuseType;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  targetId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { AbuseType } from '../../../entities/abuse-report.entity';

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

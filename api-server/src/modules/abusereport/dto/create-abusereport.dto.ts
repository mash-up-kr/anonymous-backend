import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'src/entities/abusereport.entity';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateAbuseReportDto {
  @IsNotEmpty()
  @IsEnum(Type)
  @ApiProperty({ enum: Type })
  type: Type;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  targetId: number;
}
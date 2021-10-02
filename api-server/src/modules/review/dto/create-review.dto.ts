import { Hole } from '../../../entities/review.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsEnum(Hole)
  @ApiProperty({ enum: Hole })
  hole: Hole;

  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({
    type: Number,
  })
  keywords: number[];
}

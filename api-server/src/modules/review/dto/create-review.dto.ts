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

  @IsNotEmpty()
  @ApiProperty({
    description: 'name of the app',
  })
  appName: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'url of the app icon, e.g. https://awesome-app-logo.png',
  })
  appIconUrl: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({
    type: Number,
  })
  keywords: number[];
}

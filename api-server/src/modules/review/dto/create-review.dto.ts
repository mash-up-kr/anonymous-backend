import { Hole } from '../../../entities/review.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({
    example: '이제 그만 너를 놓아줄게...',
  })
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
  @ApiPropertyOptional({
    type: Number,
  })
  keywords: number[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Hole } from '../../../entities/review.entity';

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
  @ApiProperty({
    type: [String],
  })
  hashtags: string[];
}

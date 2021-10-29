import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt } from 'class-validator';

export enum ImageFormat {
  png = 'png',
  jpeg = 'jpeg',
  webp = 'webp',
}

export class UploadImageOptionDto {
  @IsInt()
  @Type(() => Number)
  @ApiPropertyOptional({
    example: 300,
    description: 'Max file size of the photo, default 300(KB)',
  })
  maxKB: number = 300;

  @IsEnum(ImageFormat)
  @ApiPropertyOptional({
    enum: ['png', 'jpeg', 'webp'],
    example: ImageFormat.png,
    description: 'Format to be transformed, defualt `png`',
  })
  format: ImageFormat = ImageFormat.png;
}

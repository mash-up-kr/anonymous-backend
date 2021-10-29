import { BadRequestException, Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { MAX_IMAGE_RESIZE_COUNT, MAX_IMAGE_WIDTH } from 'src/constants';
import { ImageFormat } from '../upload/dto/upload-image-option.dto';

@Injectable()
export class ImageService {
  async resize(
    buffer: Buffer,
    option: { maxKB: number; format: ImageFormat },
  ): Promise<Buffer> {
    try {
      const image = await sharp(buffer).metadata();
      const { width } = image;

      // When size and width is acceptable, skip constraint.
      if (width < MAX_IMAGE_WIDTH && buffer.byteLength < option.maxKB * 1000) {
        return buffer;
      }

      return await this.constraintImage(buffer, { width }, option);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  private async constraintImage(
    buffer: Buffer,
    { quality = 100, retried = 0, width }: ConstraintOption,
    { format, maxKB, dropQuality = 5, dropWidth = 100 }: FixedConstraintOption,
  ): Promise<Buffer> {
    if (retried > MAX_IMAGE_RESIZE_COUNT) {
      throw new Error('Cannot resize image');
    }

    const resized = await sharp(buffer)
      .resize({ width: Math.min(width, MAX_IMAGE_WIDTH) })
      [format]({ quality })
      .toBuffer();

    if (resized.byteLength > maxKB * 1000) {
      // adjust image options and retry
      return this.constraintImage(
        buffer,
        {
          width: Math.min(width - dropWidth, MAX_IMAGE_WIDTH),
          quality: quality - dropQuality,
          retried: retried + 1,
        },
        { format, maxKB, dropQuality, dropWidth },
      );
    }

    return resized;
  }
}

type ConstraintOption = {
  width: number;
  quality?: number;
  retried?: number;
};

type FixedConstraintOption = {
  dropWidth?: number;
  dropQuality?: number;
  format: ImageFormat;
  maxKB: number;
};

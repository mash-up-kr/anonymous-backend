import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCreatedResponse } from '@nestjs/swagger';
import { ApiFile } from 'src/utils/swagger';
import { ImageService } from '../image/image.service';
import { UploadImageOptionDto } from './dto/upload-image-option.dto';
import { UploadImageResposneDto } from './dto/upload-image-response.dto';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly imageService: ImageService,
  ) {}

  @Post('/')
  @ApiFile('image')
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: UploadImageResposneDto })
  @UseInterceptors(FileInterceptor('image'))
  async postImage(
    @UploadedFile() image: Express.Multer.File,
    @Query() option: UploadImageOptionDto,
  ): Promise<UploadImageResposneDto> {
    const buffer = await this.imageService.resize(image.buffer, option);
    return await this.uploadService.uploadImage(buffer, option.format);
  }
}

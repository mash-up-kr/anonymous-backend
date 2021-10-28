import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Post('/')
  @UseInterceptors(FileInterceptor('image'))
  async postImage(@UploadedFile() image: Express.Multer.File) {
    console.log(image.mimetype);
    console.log(image);
    return 'ok';
  }
}

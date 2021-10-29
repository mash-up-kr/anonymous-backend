import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ImageModule } from '../image/image.module';
import { UploadService } from './upload.service';

@Module({
  imports: [ImageModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}

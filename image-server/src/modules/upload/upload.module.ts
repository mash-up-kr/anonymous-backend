import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';

@Module({
  imports: [ImageModule],
  controllers: [UploadController],
  providers: [],
})
export class UploadModule {}

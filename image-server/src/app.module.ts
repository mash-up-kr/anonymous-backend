import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './modules/upload/upload.module';
import { ImageService } from './modules/image/image.service';
import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [UploadModule, ImageModule],
  controllers: [AppController],
  providers: [AppService, ImageService],
})
export class AppModule {}

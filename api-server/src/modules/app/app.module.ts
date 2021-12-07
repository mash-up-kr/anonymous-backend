import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from '../../entities/app.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forFeature([App])],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}

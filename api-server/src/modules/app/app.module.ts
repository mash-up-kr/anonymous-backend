import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from '../../entities/app.entity';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forFeature([App])],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}

import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from '../../entities/app.entity';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forFeature([App])],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}

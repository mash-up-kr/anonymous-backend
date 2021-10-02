import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './core/config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SignupModule } from './modules/signup/signup.module';
import { HitModule } from './modules/hit/hit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    SignupModule,
    HitModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

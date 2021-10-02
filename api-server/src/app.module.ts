import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './core/config/database.config';
import slackConfig from './core/config/slack.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SignupModule } from './modules/signup/signup.module';
import { SlackModule } from './modules/slack/slack.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, slackConfig],
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    SignupModule,
    SlackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

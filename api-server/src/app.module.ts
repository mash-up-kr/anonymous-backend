import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './core/config/database.config';
import slackConfig from './core/config/slack.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import authConfig from './core/config/auth.config';
import { SlackModule } from './modules/slack/slack.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { KeywordModule } from './modules/keyword/keyword.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig, slackConfig],
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    SlackModule,
    KeywordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

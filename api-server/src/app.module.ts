import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './core/config/database.config';
import slackConfig from './core/config/slack.config';
import mailConfig from './core/config/mail.config';
import authConfig from './core/config/auth.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HitModule } from './modules/hit/hit.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SlackModule } from './modules/slack/slack.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { KeywordModule } from './modules/keyword/keyword.module';
import { ReviewModule } from './modules/review/review.module';
import { CommentsModule } from './modules/comments/comments.module';
import { AbuseReportModule } from './modules/abusereport/abusereport.module';
import { AppModule } from './modules/app/app.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig, slackConfig, mailConfig],
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    HitModule,
    AuthModule,
    UserModule,
    SlackModule,
    ReviewModule,
    KeywordModule,
    CommentsModule,
    AbuseReportModule,
    AppModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

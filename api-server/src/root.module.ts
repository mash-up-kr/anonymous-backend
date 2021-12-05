import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { LogLevel } from '@sentry/types';
import authConfig from './core/config/auth.config';
import databaseConfig from './core/config/database.config';
import mailConfig from './core/config/mail.config';
import slackConfig from './core/config/slack.config';
import { LogInterceptor } from './core/interceptors/log.interceptor';
import { PrivacyReplacer } from './core/interceptors/PrivacyReplacer';
import { SentryInterceptor } from './core/interceptors/sentry.interceptor';
import { AbuseReportModule } from './modules/abusereport/abuse-report.module';
import { AppModule } from './modules/app/app.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';
import { HashtagModule } from './modules/hashtag/hashtag.module';
import { HitModule } from './modules/hit/hit.module';
import { ReviewModule } from './modules/review/review.module';
import { SearchModule } from './modules/search/search.module';
import { SlackModule } from './modules/slack/slack.module';
import { UserModule } from './modules/user/user.module';
import { RootController } from './root.controller';
import { RootService } from './root.service';

@Module({
  imports: [
    SentryModule.forRoot({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      logLevel: LogLevel.Debug,
    }),
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
    HashtagModule,
    CommentsModule,
    AbuseReportModule,
    AppModule,
    SearchModule,
  ],
  controllers: [RootController],
  providers: [
    RootService,
    PrivacyReplacer,
    {
      provide: APP_INTERCEPTOR,
      useClass: SentryInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
    {
      provide: 'LOGGING_IGNORE_PATH',
      useValue: ['/v1/api/health'],
    },
  ],
})
export class RootModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { VerifyCode } from '../../entities/verify-code.entity';
import { User } from '../../entities/user.entity';
import { UserModule } from '../user/user.module';
import { Comment } from '../../entities/comment.entity';
import { Review } from '../../entities/review.entity';
import { PasswordHasher } from './password-hasher';
import { UserService } from '../user/user.service';
import { MailSender } from './mail-sender';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule,
    TypeOrmModule.forFeature([VerifyCode, User, Comment, Review]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get('auth').secret,
          signOptions: config.get('auth').signOptions,
        };
      },
      imports: [ConfigModule],
    }),
  ],
  controllers: [AuthController],
  providers: [
    PasswordHasher,
    LocalStrategy,
    JwtStrategy,
    AuthService,
    UserService,
    MailSender,
  ],
  exports: [AuthService],
})
export class AuthModule {}

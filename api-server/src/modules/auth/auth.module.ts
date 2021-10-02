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
import { PasswordHasher } from './password-hasher';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule,
    TypeOrmModule.forFeature([VerifyCode, User]),
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
  providers: [AuthService, PasswordHasher, JwtStrategy, UserService],
  exports: [AuthService],
})
export class AuthModule {}

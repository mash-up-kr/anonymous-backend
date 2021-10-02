import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../../entities/user.entity';
import { VerifyCode } from '../../entities/verify-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, VerifyCode])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

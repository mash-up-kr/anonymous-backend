import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { User } from '../../entities/user.entity';
import { VerifyCode } from '../../entities/verify-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, VerifyCode])],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}

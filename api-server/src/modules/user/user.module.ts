import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LikesModule } from '../likes/likes.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LikesModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

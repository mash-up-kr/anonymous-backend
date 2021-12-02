import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthorizedRequest } from '../auth/dto/sign-up.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { docs } from './user.docs';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @docs.getAllUser('유저 목록 조회')
  async getAllUser() {
    const users = await this.userService.findAll();
    return users.map(({ password, ...user }) => {
      void password;
      return user;
    });
  }

  @Get(':id')
  @docs.getUser('단일 유저 조회')
  async getUser(@Param('id') id: number) {
    const user = await this.userService.findOneById(id);
    return user;
  }

  @Post()
  @docs.createUser('유저 생성')
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.userService.createUser(dto);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @docs.updateUser('유저 정보 수정')
  async updateUser(@Request() req: AuthorizedRequest, @Body() dto: UpdateUserDto) {
    const user = await this.userService.findAndUpdate(req.user.id, dto);
    delete user.password;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @docs.deleteUser('유저 삭제')
  async deleteUser(@Request() req: AuthorizedRequest) {
    return this.userService.deleteUserById(req.user.id);
  }
}

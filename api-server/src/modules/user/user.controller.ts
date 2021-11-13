import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { docs } from './user.docs';
import { ApiTags } from '@nestjs/swagger';

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

  @Put(':id')
  @docs.updateUser('유저 정보 수정')
  async updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    const user = await this.userService.findAndUpdate(id, dto);
    return user;
  }

  @Delete(':id')
  @docs.deleteUser('유저 삭제')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}

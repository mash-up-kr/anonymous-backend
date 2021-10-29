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
  @docs.getAllUser('유저 목록을 조회합니다')
  async getAllUser() {
    const users = await this.userService.findAll();
    return users.map(({ password, ...user }) => {
      void password;
      return user;
    });
  }

  @Get(':id')
  @docs.getUser('아이디로 유저를 조회합니다.')
  async getUser(@Param('id') id: number) {
    const user = await this.userService.findOneById(id);
    delete user.password;
    return user;
  }

  @Post()
  @docs.createUser('유저를 생성합니다.')
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.userService.createUser(dto);
    delete user.password;
    return user;
  }

  @Put(':id')
  @docs.updateUser('유저를 수정합니다.')
  async updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    const user = await this.userService.findAndUpdate(id, dto);
    delete user.password;
    return user;
  }

  @Delete(':id')
  @docs.deleteUser('유저를 삭제합니다.')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}

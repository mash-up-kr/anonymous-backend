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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getAllUser() {
    const users = await this.userService.findAll();
    return users.map(({ password, ...user }) => {
      void password;
      return user;
    });
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    const user = await this.userService.findOneById(id);
    delete user.password;
    return user;
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.userService.createUser(dto);
    delete user.password;
    return user;
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    const user = await this.userService.findAndUpdate(id, dto);
    delete user.password;
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}

import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserResponseDto } from './dto/delete-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (user == null) {
      throw new NotFoundException();
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email });
  }

  async findAndUpdate(
    id: number,
    { nickname, avatarItemType, planetType }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.findOneById(id);
    user.nickname = nickname;
    user.avatarItemType = avatarItemType;
    user.planetType = planetType;
    return await this.usersRepository.save(user);
  }

  async deleteUserById(id: number): Promise<DeleteUserResponseDto> {
    await this.usersRepository.delete(id);
    return { isDelete: true };
  }
}

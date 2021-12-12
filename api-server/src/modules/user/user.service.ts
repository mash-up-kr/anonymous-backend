import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Comment } from '../../entities/comment.entity';
import { Review } from '../../entities/review.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserResponseDto } from './dto/delete-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      ...data,
      profileImage: `https://${process.env.CDN_HOST}/upload/e4b3749a-8690-47bb-94c0-b77cfed0edaa.png`,
    });
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
    return await this.usersRepository.findOne(
      { email },
      { select: ['password', 'email', 'id', 'nickname'] },
    );
  }

  async findAndUpdate(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    const updated = Object.assign(user, dto);
    return await this.usersRepository.save(updated);
  }

  async deleteUserById(id: number): Promise<DeleteUserResponseDto> {
    const user = await this.usersRepository.findOne(id);
    const comments = await this.commentRepository.find({ where: { user: user } });
    const reviews = await this.reviewRepository.find({ where: { user: user } });
    await this.commentRepository.softRemove(comments);
    await this.reviewRepository.softRemove(reviews);
    await this.usersRepository.delete(id);
    return { isDelete: true };
  }
}

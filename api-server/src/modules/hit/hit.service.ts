import { User } from '../../entities/user.entity';
import { Hit } from '../../entities/hit.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHitDto } from './dto/hit.dto';

@Injectable()
export class HitService {
  constructor(
    @InjectRepository(Hit)
    private hitRepository: Repository<Hit>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createHit(hitData: CreateHitDto): Promise<Hit> {
    const { userId } = hitData;
    const user = await this.userRepository.findOne(userId);
    if (user === undefined) {
      throw new NotFoundException();
    }
    const hit = this.hitRepository.create({ user });
    return await this.hitRepository.save(hit);
  }

  async findOne(id: number): Promise<Hit> {
    const hit = await this.hitRepository.findOne(id);
    if (hit === undefined) {
      throw new NotFoundException();
    }
    return hit;
  }

  async getAll(userId: number): Promise<Hit[]> {
    const user = await this.userRepository.findOne(userId);
    const times = await this.hitRepository.find({ user });
    return times;
  }
}

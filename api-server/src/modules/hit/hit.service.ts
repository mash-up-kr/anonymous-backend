import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hit } from 'src/entities/hit.entity';
import { User } from 'src/entities/user.entity';
import { CreateHitDto } from './dto/hit.dto';

@Injectable()
export class HitService {
    constructor(
    @InjectRepository(Hit)
    private HitRepository: Repository<Hit>,
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

async createHit(hitData: CreateHitDto): Promise<Hit> {
  const { userId } = hitData;
  const user = await this.UserRepository.findOne(userId);
  if (user === undefined) {
    throw new NotFoundException();
  }
  const hit = this.HitRepository.create({ user});
  return await this.HitRepository.save(hit);
}

async findOne(id: number): Promise<Hit> {
    const hit = await this.HitRepository.findOne(id);
    if (hit === undefined) {
      throw new NotFoundException();
    }
    return hit;
  }

async getAll(userId: number): Promise<Hit[]> {
    const user = await this.UserRepository.findOne(userId);
    const times = await this.HitRepository.find({user:user});
    return times;
  }

}
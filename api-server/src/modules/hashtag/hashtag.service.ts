import { Hashtag } from '../../entities/hashtag.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  async findAll(): Promise<Hashtag[]> {
    return this.hashtagRepository.find();
  }

  async findOne(id: number): Promise<Hashtag> {
    if (isNaN(id)) {
      return undefined;
    }

    return await this.hashtagRepository.findOne(id);
  }

  async findOneByName(name: string): Promise<Hashtag> {
    return await this.hashtagRepository.findOne({ name });
  }
}

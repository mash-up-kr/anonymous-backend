import { Hashtag } from '../../entities/hashtag.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpsertHashtagDto } from './dto/upsert-hashtag.dto';

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

  async upsert({ name }: UpsertHashtagDto): Promise<Hashtag> {
    let hashtag = await this.findOneByName(name);
    if (hashtag == null) {
      hashtag = this.hashtagRepository.create({ name });
    }
    await this.hashtagRepository.save(hashtag);
    return hashtag;
  }

  async remove(id: number): Promise<void> {
    const hashtag = await this.hashtagRepository.findOne({ id });
    if (!hashtag) {
      throw new NotFoundException();
    }
    await this.hashtagRepository.remove(hashtag);
  }
}

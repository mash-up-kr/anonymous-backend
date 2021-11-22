import { Hashtag } from '../../entities/keyword.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class KeywordService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly keywordRepository: Repository<Hashtag>,
  ) {}

  async findAll(): Promise<Hashtag[]> {
    return this.keywordRepository.find();
  }

  async findOne(id: number): Promise<Hashtag> {
    if (isNaN(id)) {
      return undefined;
    }

    return await this.keywordRepository.findOne(id);
  }
}

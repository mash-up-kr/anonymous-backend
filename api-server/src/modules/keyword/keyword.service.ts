import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Keyword } from 'src/entities/keyword.entity';
import { Repository } from 'typeorm';

@Injectable()
export class KeywordService {
  constructor(
    @InjectRepository(Keyword)
    private readonly keywordRepository: Repository<Keyword>,
  ) {}

  async findAll(): Promise<Keyword[]> {
    return this.keywordRepository.find();
  }

  async findOne(id: number): Promise<Keyword> {
    if (isNaN(id)) {
      return undefined;
    }

    return await this.keywordRepository.findOne(id);
  }
}

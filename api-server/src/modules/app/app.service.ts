import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { App } from '../../entities/app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(App) private readonly appRepository: Repository<App>,
  ) {}

  /**
   *
   */
  async createIfNotExist(name: string, iconUrl: string): Promise<App> {
    return;
  }
}

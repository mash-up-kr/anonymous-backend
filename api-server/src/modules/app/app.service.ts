import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hole } from 'src/entities/review.entity';
import { Repository } from 'typeorm';
import { App } from '../../entities/app.entity';
import Fuse from 'fuse.js';

@Injectable()
export class AppService implements OnModuleInit {
  private index: Fuse<App>;

  constructor(
    @InjectRepository(App) private readonly appRepository: Repository<App>,
  ) {
    this.index = new Fuse([], { keys: ['name'] });
  }

  async upsert(name: string, iconUrl: string): Promise<App> {
    let app = await this.appRepository.findOne({ where: { name } });
    if (app == null) {
      app = this.appRepository.create({ name });
    }

    app.iconUrl = iconUrl;

    await this.appRepository.save(app);
    await this.loadIndex();

    return app;
  }

  async findOneByName(name: string): Promise<App> {
    const app = await this.appRepository.findOne({ name });
    if (app == null) {
      throw new NotFoundException();
    }
    return app;
  }

  async updateAppReviewCount(
    name: string,
    hole: Hole,
    amount: number,
  ): Promise<App> {
    const app = await this.appRepository.findOne({ name });
    if (app == null) {
      return;
    }

    if (hole === Hole.BLACK) {
      app.review_count_black += amount;
    } else {
      app.review_count_white += amount;
    }

    await this.appRepository.save(app);
  }

  async changeReviewHole(name: string, toHole: Hole): Promise<App> {
    const app = await this.appRepository.findOne({ name });
    if (app == null) {
      return;
    }

    if (toHole === Hole.BLACK) {
      app.review_count_white -= 1;
      app.review_count_black += 1;
    } else {
      app.review_count_white += 1;
      app.review_count_black -= 1;
    }

    await this.appRepository.save(app);
    await this.loadIndex();
  }

  async loadIndex() {
    const apps = await this.appRepository.find();
    this.index = new Fuse(apps, { keys: ['name'] });
  }

  searchByNameFromCache(query: string) {
    return this.index.search(query, { limit: 20 }).map((result) => result.item);
  }

  onModuleInit() {
    this.loadIndex();
  }
}

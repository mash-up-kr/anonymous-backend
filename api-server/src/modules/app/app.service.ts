import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { groupBy } from 'ramda';
import { Hole } from 'src/entities/review.entity';
import { Repository } from 'typeorm';
import { App } from '../../entities/app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(App) private readonly appRepository: Repository<App>,
  ) {}

  async upsert(name: string, iconUrl: string): Promise<App> {
    let app = await this.appRepository.findOne({ where: { name } });
    if (app == null) {
      app = this.appRepository.create({ name });
    }

    app.iconUrl = iconUrl;

    await this.appRepository.save(app);

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
  }
}

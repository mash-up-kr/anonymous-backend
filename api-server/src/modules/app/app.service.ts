import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { groupBy } from 'ramda';
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
    const app = await this.appRepository.findOne(
      { name },
      { relations: ['reviews'] },
    );
    if (app == null) {
      throw new NotFoundException();
    }
    return app;
  }

  async findOneByNameAndCountRatio(name: string): Promise<App> {
    // TODO, change app entity to have review_count field(INT) and aggregate
    // every review
    const app = await this.findOneByName(name);
    const ratio = {
      black: 0,
      white: 0,
    };
    if (app.reviews.length > 0) {
      const { black, white } = groupBy((review) => review.hole, app.reviews);
      ratio.black = Math.round((black.length / app.reviews.length) * 100);
      ratio.white = Math.round((white.length / app.reviews.length) * 100);
    }

    app.ratio = ratio;

    return app;
  }
}

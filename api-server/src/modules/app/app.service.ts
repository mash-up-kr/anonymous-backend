import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}

import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default registerAs(
  'database',
  async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: process.env.DATABASE_HOST ?? 'localhost',
      port: Number(process.env.DATABASE_POST ?? 3306),
      database: process.env.DATABASE_NAME ?? 'test',
      username: process.env.DATABASE_USER ?? 'root',
      password: process.env.DATABASE_PASSWORD ?? 'test',
      entities: [path.join(__dirname, '..', '..') + '/**/*.entity.{js,ts}'],
      synchronize: process.env.NODE_ENV !== 'production',
      namingStrategy: new SnakeNamingStrategy(),
    };
  },
);

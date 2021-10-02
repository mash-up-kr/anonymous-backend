import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default registerAs(
  'database',
  async (): Promise<TypeOrmModuleOptions> => {
    return {
      ...require('../../../ormconfig'),
      namingStrategy: new SnakeNamingStrategy(),
    };
  },
);

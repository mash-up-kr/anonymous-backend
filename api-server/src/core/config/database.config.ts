import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  async (): Promise<TypeOrmModuleOptions> => {
    return {
      ...require('../../../ormconfig'),
    };
  },
);

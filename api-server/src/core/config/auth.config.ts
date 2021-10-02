import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export type HashingOptions = {
  iv: string;
  salt: string;
};

export type AuthConfig = JwtModuleOptions & { hashingOptions: HashingOptions };

export default registerAs('auth', async (): Promise<AuthConfig> => {
  return {
    ...require('../../../authconfig'),
  };
});

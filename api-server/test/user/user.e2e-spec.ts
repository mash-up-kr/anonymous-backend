import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { setupE2E } from '../utils/setup';

// npx jest --config ./test/jest-e2e.json ./test/user/user.e2e-spec.ts
describe('UserController (e2e)', () => {
  let app: INestApplication;
  let server: ReturnType<typeof request>;

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    ({ app, server } = await setupE2E({
      database: 'user_test',
      fixture: require.resolve('./user.fixture.yml'),
    }));
  });

  it('/user/foo (GET)', async () => {
    return server.get('/v1/api/user/foo').expect(404);
  });

  it('/user/1 (GET)', async () => {
    const { body } = await server.get('/user/1').expect(200);
    expect(body.nickname).toEqual('foo');
  });
});

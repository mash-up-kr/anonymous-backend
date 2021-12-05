import { RootModule } from '../../src/root.module';
import { Test, TestingModule } from '@nestjs/testing';
import { loadFixtures } from './loadFixture';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import * as assert from 'assert';
import * as fs from 'fs';
import * as mysql from 'mysql2';

/**
 * Setup database schema and initialize testing module.
 * It creates new database if not exist.
 */
export async function setupE2E({
  database,
  fixture,
}: {
  database: string;
  fixture: string;
}) {
  assertValidDatabaseName(database);
  assertFixtureExist(fixture);
  await ensureDatabaseSchemaExist(database);

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [RootModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  await app.init();
  await loadFixtures(fixture, app.get(Connection));

  const server = request(app.getHttpServer());

  return { app, server } as const;
}

function assertValidDatabaseName(database: string) {
  assert(
    /^[a-z_]+$/.test(database),
    `Database name should match [a-z_]+. for example 'auth_test'. given ${database}`,
  );
}

function assertFixtureExist(path: string) {
  assert(fs.existsSync(path), `Fixture yml is missing at location '${path}'`);
}

async function ensureDatabaseSchemaExist(database: string) {
  const ormConfig = await import('../../ormconfig');

  if (ormConfig.host !== 'localhost') {
    throw new Error(
      `Invalid test environment. make sure NODE_ENV is not 'production'`,
    );
  }

  const connection = mysql.createConnection({
    host: ormConfig.host,
    user: ormConfig.username,
    password: ormConfig.password,
  });

  const query = `CREATE SCHEMA IF NOT EXISTS \`${database}\` DEFAULT CHARACTER SET utf8;`;

  await connection.promise().query(query);
  await connection.promise().end();

  ormConfig.database = database;
}

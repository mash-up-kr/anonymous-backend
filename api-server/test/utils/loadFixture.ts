import { Connection } from 'typeorm';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

export async function loadFixtures(
  fixturePath: string,
  connection: Connection,
): Promise<any> {
  await connection.synchronize(true);
  const items = yaml.load(fs.readFileSync(fixturePath, 'utf-8')) as any[];

  if (!items) {
    throw new Error('Fixture is empty.');
  }

  await Promise.all(
    items.map(async (item: any) => {
      const entityName = Object.keys(item)[0];
      const data = item[entityName];
      await connection
        .createQueryBuilder()
        .insert()
        .into(entityName)
        .values(data)
        .execute();
    }),
  );
}

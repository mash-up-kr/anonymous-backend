import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHoleCountToApp1638687636964 implements MigrationInterface {
  name = 'AddHoleCountToApp1638687636964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`production\`.\`app\` ADD \`review_count_white\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`production\`.\`app\` ADD \`review_count_black\` int NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`production\`.\`app\` DROP COLUMN \`review_count_black\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`production\`.\`app\` DROP COLUMN \`review_count_white\``,
    );
  }
}

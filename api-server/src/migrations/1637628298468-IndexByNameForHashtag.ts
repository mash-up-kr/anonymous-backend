import {MigrationInterface, QueryRunner} from "typeorm";

export class IndexByNameForHashtag1637628298468 implements MigrationInterface {
    name = 'IndexByNameForHashtag1637628298468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`production\`.\`hashtag\` ADD UNIQUE INDEX \`IDX_347fec870eafea7b26c8a73bac\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`production\`.\`hashtag\` DROP INDEX \`IDX_347fec870eafea7b26c8a73bac\``);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameKeywordToHashtag1637627775833 implements MigrationInterface {
    name = 'RenameKeywordToHashtag1637627775833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_hashtags\` ADD CONSTRAINT \`FK_d61490fc16d9cf1fb1454fee776\` FOREIGN KEY (\`hashtag_id\`) REFERENCES \`production\`.\`hashtag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_hashtags\` DROP FOREIGN KEY \`FK_d61490fc16d9cf1fb1454fee776\``);
    }

}

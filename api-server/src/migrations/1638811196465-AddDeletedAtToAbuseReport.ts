import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDeletedAtToAbuseReport1638811196465 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` ADD \`deleted_at\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` DROP COLUMN \`deleted_at\``);
    }

}

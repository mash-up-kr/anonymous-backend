import {MigrationInterface, QueryRunner} from "typeorm";

export class AddProfileImageFieldToUser1636827993445 implements MigrationInterface {
    name = 'AddProfileImageFieldToUser1636827993445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`production\`.\`user\` ADD \`profileImage\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`production\`.\`user\` DROP COLUMN \`profileImage\``);
    }

}

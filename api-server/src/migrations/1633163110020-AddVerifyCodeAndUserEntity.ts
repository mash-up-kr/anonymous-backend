import {MigrationInterface, QueryRunner} from "typeorm";

export class AddVerifyCodeAndUserEntity1633163110020 implements MigrationInterface {
    name = 'AddVerifyCodeAndUserEntity1633163110020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`production\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`nickName\` varchar(255) NOT NULL, \`isVerified\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`production\`.\`verify_code\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_d65076c92b0e6452d976249e3a\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_d65076c92b0e6452d976249e3a\` ON \`production\`.\`verify_code\``);
        await queryRunner.query(`DROP TABLE \`production\`.\`verify_code\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`production\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`production\`.\`user\``);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class AddReviewLikesTable1636639170411 implements MigrationInterface {
    name = 'AddReviewLikesTable1636639170411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`production\`.\`review_likes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`reviewId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_likes\` ADD CONSTRAINT \`FK_0d688be5d7def42d685de4d2c74\` FOREIGN KEY (\`userId\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_likes\` ADD CONSTRAINT \`FK_9860c907f782adb487acfb2a539\` FOREIGN KEY (\`reviewId\`) REFERENCES \`production\`.\`review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_likes\` DROP FOREIGN KEY \`FK_9860c907f782adb487acfb2a539\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_likes\` DROP FOREIGN KEY \`FK_0d688be5d7def42d685de4d2c74\``);
        await queryRunner.query(`DROP TABLE \`production\`.\`review_likes\``);
    }

}

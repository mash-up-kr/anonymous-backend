import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCommentTable1635489825037 implements MigrationInterface {
    name = 'AddCommentTable1635489825037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`production\`.\`review_comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`reviewId\` int NULL, \`userId\` int NULL, \`parentId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD CONSTRAINT \`FK_f7eb91a4c1d977a9b468e10ca55\` FOREIGN KEY (\`reviewId\`) REFERENCES \`production\`.\`review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD CONSTRAINT \`FK_803011311b44532ee5715447980\` FOREIGN KEY (\`userId\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD CONSTRAINT \`FK_25d65c01e1b3192c934c2469b77\` FOREIGN KEY (\`parentId\`) REFERENCES \`production\`.\`review_comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP FOREIGN KEY \`FK_25d65c01e1b3192c934c2469b77\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP FOREIGN KEY \`FK_803011311b44532ee5715447980\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP FOREIGN KEY \`FK_f7eb91a4c1d977a9b468e10ca55\``);
        await queryRunner.query(`DROP TABLE \`production\`.\`review_comments\``);
    }

}

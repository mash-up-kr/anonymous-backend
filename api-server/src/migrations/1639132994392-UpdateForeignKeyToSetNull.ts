import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateForeignKeyToSetNull1639132994392 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` DROP FOREIGN KEY \`FK_ed232e88d60a0d539b600431d57\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` DROP FOREIGN KEY \`FK_81446f2ee100305f42645d4d6c2\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_likes\` DROP FOREIGN KEY \`FK_3cd606c64c23bfb2e8634f91b69\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_likes\` DROP FOREIGN KEY \`FK_eeb9d9410f16e3b743bd3c9b007\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP FOREIGN KEY \`FK_25d65c01e1b3192c934c2469b77\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP FOREIGN KEY \`FK_d00ccfa77fcc9b25fcf9b9b50c1\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP FOREIGN KEY \`FK_16cc302113c3fd00d930056fa38\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`hit\` DROP FOREIGN KEY \`FK_b31ef5cca03f9a14652d0e5c9c7\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`hit\` ADD CONSTRAINT \`FK_b31ef5cca03f9a14652d0e5c9c7\` FOREIGN KEY (\`user_id\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD CONSTRAINT \`FK_16cc302113c3fd00d930056fa38\` FOREIGN KEY (\`review_id\`) REFERENCES \`production\`.\`review\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD CONSTRAINT \`FK_d00ccfa77fcc9b25fcf9b9b50c1\` FOREIGN KEY (\`user_id\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD CONSTRAINT \`FK_25d65c01e1b3192c934c2469b77\` FOREIGN KEY (\`parentId\`) REFERENCES \`production\`.\`review_comments\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_likes\` ADD CONSTRAINT \`FK_eeb9d9410f16e3b743bd3c9b007\` FOREIGN KEY (\`user_id\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_likes\` ADD CONSTRAINT \`FK_3cd606c64c23bfb2e8634f91b69\` FOREIGN KEY (\`review_id\`) REFERENCES \`production\`.\`review\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` ADD CONSTRAINT \`FK_81446f2ee100305f42645d4d6c2\` FOREIGN KEY (\`user_id\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` ADD CONSTRAINT \`FK_ed232e88d60a0d539b600431d57\` FOREIGN KEY (\`user_id\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` DROP FOREIGN KEY \`FK_ed232e88d60a0d539b600431d57\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` DROP FOREIGN KEY \`FK_81446f2ee100305f42645d4d6c2\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_likes\` DROP FOREIGN KEY \`FK_3cd606c64c23bfb2e8634f91b69\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_likes\` DROP FOREIGN KEY \`FK_eeb9d9410f16e3b743bd3c9b007\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP FOREIGN KEY \`FK_25d65c01e1b3192c934c2469b77\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP FOREIGN KEY \`FK_d00ccfa77fcc9b25fcf9b9b50c1\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP FOREIGN KEY \`FK_16cc302113c3fd00d930056fa38\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`hit\` DROP FOREIGN KEY \`FK_b31ef5cca03f9a14652d0e5c9c7\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`hit\` ADD CONSTRAINT \`FK_b31ef5cca03f9a14652d0e5c9c7\` FOREIGN KEY (\`user_id\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD CONSTRAINT \`FK_16cc302113c3fd00d930056fa38\` FOREIGN KEY (\`review_id\`) REFERENCES \`production\`.\`review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD CONSTRAINT \`FK_d00ccfa77fcc9b25fcf9b9b50c1\` FOREIGN KEY (\`user_id\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD CONSTRAINT \`FK_25d65c01e1b3192c934c2469b77\` FOREIGN KEY (\`parentId\`) REFERENCES \`production\`.\`review_comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_likes\` ADD CONSTRAINT \`FK_eeb9d9410f16e3b743bd3c9b007\` FOREIGN KEY (\`user_id\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_likes\` ADD CONSTRAINT \`FK_3cd606c64c23bfb2e8634f91b69\` FOREIGN KEY (\`review_id\`) REFERENCES \`production\`.\`review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` ADD CONSTRAINT \`FK_81446f2ee100305f42645d4d6c2\` FOREIGN KEY (\`user_id\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` ADD CONSTRAINT \`FK_ed232e88d60a0d539b600431d57\` FOREIGN KEY (\`user_id\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

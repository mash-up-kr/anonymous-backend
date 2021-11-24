import {MigrationInterface, QueryRunner} from "typeorm";

export class Seed1637154394500 implements MigrationInterface {
    name = 'Seed1637154394500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`production\`.\`hit\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`production\`.\`review_comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`review_id\` int NULL, \`user_id\` int NULL, \`parentId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`production\`.\`keyword\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`production\`.\`app\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`icon_url\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_f36adbb7b096ceeb6f3e80ad14\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`production\`.\`review_likes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, \`review_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`production\`.\`review\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`hole\` enum ('black', 'white') NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` int NULL, \`app_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`production\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`profile_image\` varchar(255) NOT NULL, \`nickname\` varchar(255) NOT NULL, \`planet_type\` varchar(255) NULL, \`avatar_item_type\` varchar(255) NULL, \`is_verified\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_e2364281027b926b879fa2fa1e\` (\`nickname\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`production\`.\`abuse_report\` (\`id\` int NOT NULL AUTO_INCREMENT, \`target_id\` int NOT NULL, \`type\` enum ('review', 'comment') NOT NULL, \`status\` enum ('received', 'processing', 'done') NOT NULL DEFAULT 'received', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`production\`.\`verify_code\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_d65076c92b0e6452d976249e3a\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`production\`.\`review_keywords\` (\`review_id\` int NOT NULL, \`keyword_id\` int NOT NULL, INDEX \`IDX_cdfabfe3f3ea23fc4237f5633e\` (\`review_id\`), INDEX \`IDX_c156cb8aea01f0e68619c40f56\` (\`keyword_id\`), PRIMARY KEY (\`review_id\`, \`keyword_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`hit\` ADD CONSTRAINT \`FK_b31ef5cca03f9a14652d0e5c9c7\` FOREIGN KEY (\`user_id\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD CONSTRAINT \`FK_16cc302113c3fd00d930056fa38\` FOREIGN KEY (\`review_id\`) REFERENCES \`production\`.\`review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD CONSTRAINT \`FK_d00ccfa77fcc9b25fcf9b9b50c1\` FOREIGN KEY (\`user_id\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD CONSTRAINT \`FK_25d65c01e1b3192c934c2469b77\` FOREIGN KEY (\`parentId\`) REFERENCES \`production\`.\`review_comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_likes\` ADD CONSTRAINT \`FK_eeb9d9410f16e3b743bd3c9b007\` FOREIGN KEY (\`user_id\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_likes\` ADD CONSTRAINT \`FK_3cd606c64c23bfb2e8634f91b69\` FOREIGN KEY (\`review_id\`) REFERENCES \`production\`.\`review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` ADD CONSTRAINT \`FK_81446f2ee100305f42645d4d6c2\` FOREIGN KEY (\`user_id\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` ADD CONSTRAINT \`FK_2ce50c69baee057e42c0741965a\` FOREIGN KEY (\`app_id\`) REFERENCES \`production\`.\`app\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` ADD CONSTRAINT \`FK_ed232e88d60a0d539b600431d57\` FOREIGN KEY (\`user_id\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_keywords\` ADD CONSTRAINT \`FK_cdfabfe3f3ea23fc4237f5633e3\` FOREIGN KEY (\`review_id\`) REFERENCES \`production\`.\`review\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_keywords\` ADD CONSTRAINT \`FK_c156cb8aea01f0e68619c40f568\` FOREIGN KEY (\`keyword_id\`) REFERENCES \`production\`.\`keyword\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_keywords\` DROP FOREIGN KEY \`FK_c156cb8aea01f0e68619c40f568\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_keywords\` DROP FOREIGN KEY \`FK_cdfabfe3f3ea23fc4237f5633e3\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` DROP FOREIGN KEY \`FK_ed232e88d60a0d539b600431d57\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` DROP FOREIGN KEY \`FK_2ce50c69baee057e42c0741965a\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` DROP FOREIGN KEY \`FK_81446f2ee100305f42645d4d6c2\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_likes\` DROP FOREIGN KEY \`FK_3cd606c64c23bfb2e8634f91b69\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_likes\` DROP FOREIGN KEY \`FK_eeb9d9410f16e3b743bd3c9b007\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP FOREIGN KEY \`FK_25d65c01e1b3192c934c2469b77\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP FOREIGN KEY \`FK_d00ccfa77fcc9b25fcf9b9b50c1\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP FOREIGN KEY \`FK_16cc302113c3fd00d930056fa38\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`hit\` DROP FOREIGN KEY \`FK_b31ef5cca03f9a14652d0e5c9c7\``);
        await queryRunner.query(`DROP INDEX \`IDX_c156cb8aea01f0e68619c40f56\` ON \`production\`.\`review_keywords\``);
        await queryRunner.query(`DROP INDEX \`IDX_cdfabfe3f3ea23fc4237f5633e\` ON \`production\`.\`review_keywords\``);
        await queryRunner.query(`DROP TABLE \`production\`.\`review_keywords\``);
        await queryRunner.query(`DROP INDEX \`IDX_d65076c92b0e6452d976249e3a\` ON \`production\`.\`verify_code\``);
        await queryRunner.query(`DROP TABLE \`production\`.\`verify_code\``);
        await queryRunner.query(`DROP TABLE \`production\`.\`abuse_report\``);
        await queryRunner.query(`DROP INDEX \`IDX_e2364281027b926b879fa2fa1e\` ON \`production\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`production\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`production\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`production\`.\`review\``);
        await queryRunner.query(`DROP TABLE \`production\`.\`review_likes\``);
        await queryRunner.query(`DROP INDEX \`IDX_f36adbb7b096ceeb6f3e80ad14\` ON \`production\`.\`app\``);
        await queryRunner.query(`DROP TABLE \`production\`.\`app\``);
        await queryRunner.query(`DROP TABLE \`production\`.\`keyword\``);
        await queryRunner.query(`DROP TABLE \`production\`.\`review_comments\``);
        await queryRunner.query(`DROP TABLE \`production\`.\`hit\``);
    }

}

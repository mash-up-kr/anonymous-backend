import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIndexForSearch1636010670132 implements MigrationInterface {
    name = 'AddIndexForSearch1636010670132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`production\`.\`verify_code\` CHANGE \`created_at\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`hit\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`hit\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`hit\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`hit\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD \`reviewId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`keyword\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`keyword\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`keyword\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`app\` ADD \`iconUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`app\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`app\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`app\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` ADD \`appId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`user\` ADD \`planetType\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`user\` ADD \`avatarItemType\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`user\` ADD \`isVerified\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`user\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`user\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`user\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` ADD \`targetId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_keywords\` ADD \`reviewId\` int NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_keywords\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_keywords\` ADD PRIMARY KEY (\`reviewId\`, \`keywordId\`)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`user\` ADD UNIQUE INDEX \`IDX_e2364281027b926b879fa2fa1e\` (\`nickname\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_68aa14fdc711f8c969f7556ae5\` ON \`production\`.\`review_keywords\` (\`reviewId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_2627708d7c8f85b5b1fa7c0497\` ON \`production\`.\`review_keywords\` (\`keywordId\`)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`hit\` ADD CONSTRAINT \`FK_7ac280fc022cc0e5308b52b52d3\` FOREIGN KEY (\`userId\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD CONSTRAINT \`FK_f7eb91a4c1d977a9b468e10ca55\` FOREIGN KEY (\`reviewId\`) REFERENCES \`production\`.\`review\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` ADD CONSTRAINT \`FK_803011311b44532ee5715447980\` FOREIGN KEY (\`userId\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` ADD CONSTRAINT \`FK_1337f93918c70837d3cea105d39\` FOREIGN KEY (\`userId\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` ADD CONSTRAINT \`FK_2dae44f0b2ea3b38c58766b4e87\` FOREIGN KEY (\`appId\`) REFERENCES \`production\`.\`app\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` ADD CONSTRAINT \`FK_45ddb7c5e3101609256ea65be79\` FOREIGN KEY (\`userId\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_keywords\` ADD CONSTRAINT \`FK_68aa14fdc711f8c969f7556ae56\` FOREIGN KEY (\`reviewId\`) REFERENCES \`production\`.\`review\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_keywords\` ADD CONSTRAINT \`FK_2627708d7c8f85b5b1fa7c04972\` FOREIGN KEY (\`keywordId\`) REFERENCES \`production\`.\`keyword\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_keywords\` DROP FOREIGN KEY \`FK_2627708d7c8f85b5b1fa7c04972\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_keywords\` DROP FOREIGN KEY \`FK_68aa14fdc711f8c969f7556ae56\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` DROP FOREIGN KEY \`FK_45ddb7c5e3101609256ea65be79\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` DROP FOREIGN KEY \`FK_2dae44f0b2ea3b38c58766b4e87\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` DROP FOREIGN KEY \`FK_1337f93918c70837d3cea105d39\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP FOREIGN KEY \`FK_803011311b44532ee5715447980\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP FOREIGN KEY \`FK_f7eb91a4c1d977a9b468e10ca55\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`hit\` DROP FOREIGN KEY \`FK_7ac280fc022cc0e5308b52b52d3\``);
        await queryRunner.query(`DROP INDEX \`IDX_2627708d7c8f85b5b1fa7c0497\` ON \`production\`.\`review_keywords\``);
        await queryRunner.query(`DROP INDEX \`IDX_68aa14fdc711f8c969f7556ae5\` ON \`production\`.\`review_keywords\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`user\` DROP INDEX \`IDX_e2364281027b926b879fa2fa1e\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_keywords\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_keywords\` ADD PRIMARY KEY (\`reviewId\`)`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_keywords\` DROP COLUMN \`reviewId\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` DROP COLUMN \`targetId\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`user\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`user\` DROP COLUMN \`isVerified\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`user\` DROP COLUMN \`avatarItemType\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`user\` DROP COLUMN \`planetType\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` DROP COLUMN \`appId\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`app\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`app\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`app\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`app\` DROP COLUMN \`iconUrl\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`keyword\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`keyword\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`keyword\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP COLUMN \`reviewId\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review_comments\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`hit\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`hit\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`hit\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`hit\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`verify_code\` CHANGE \`createdAt\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}

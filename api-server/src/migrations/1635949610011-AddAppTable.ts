import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAppTable1635949610011 implements MigrationInterface {
    name = 'AddAppTable1635949610011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`production\`.\`app\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`iconUrl\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_f36adbb7b096ceeb6f3e80ad14\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`production\`.\`abuse_report\` (\`id\` int NOT NULL AUTO_INCREMENT, \`targetId\` int NOT NULL, \`type\` enum ('review', 'comment') NOT NULL, \`status\` enum ('received', 'processing', 'done') NOT NULL DEFAULT 'received', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` ADD \`appId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` ADD CONSTRAINT \`FK_2dae44f0b2ea3b38c58766b4e87\` FOREIGN KEY (\`appId\`) REFERENCES \`production\`.\`app\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` ADD CONSTRAINT \`FK_45ddb7c5e3101609256ea65be79\` FOREIGN KEY (\`userId\`) REFERENCES \`production\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`production\`.\`abuse_report\` DROP FOREIGN KEY \`FK_45ddb7c5e3101609256ea65be79\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` DROP FOREIGN KEY \`FK_2dae44f0b2ea3b38c58766b4e87\``);
        await queryRunner.query(`ALTER TABLE \`production\`.\`review\` DROP COLUMN \`appId\``);
        await queryRunner.query(`DROP TABLE \`production\`.\`abuse_report\``);
        await queryRunner.query(`DROP INDEX \`IDX_f36adbb7b096ceeb6f3e80ad14\` ON \`production\`.\`app\``);
        await queryRunner.query(`DROP TABLE \`production\`.\`app\``);
    }

}

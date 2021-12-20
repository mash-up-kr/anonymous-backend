import {MigrationInterface, QueryRunner} from "typeorm";

export class AddReportUserIdsToReviewAndComment1640026371494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`production\`.\`review\` ADD \`report_user_ids\` varchar(255) NOT NULL DEFAULT ''`,
        );
        await queryRunner.query(
            `ALTER TABLE \`production\`.\`review_comments\` ADD \`report_user_ids\` varchar(255) NOT NULL DEFAULT ''`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`production\`.\`review\` DROP COLUMN \`report_user_ids\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`production\`.\`review_comments\` DROP COLUMN \`report_user_ids\``,
        );
    }

}

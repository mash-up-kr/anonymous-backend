import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";
import { Review } from "src/entities/review.entity";

export class ReviewResponseDto extends Review {
    @ApiProperty({
        description: '신고가 5회 이상 된 리뷰'
    })
    @IsBoolean()
    blocked: boolean;
}
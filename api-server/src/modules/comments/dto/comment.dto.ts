import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";
import { Comment } from "src/entities/comment.entity";

export class CommentResponseDto extends Comment {
    @ApiProperty({
        description: '신고가 5회 이상 된 코멘트'
    })
    @IsBoolean()
    blocked: boolean;
}
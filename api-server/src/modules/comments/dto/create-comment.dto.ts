import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({
        description: '리뷰 id'
    })
    @IsNumber()
    reviewId: number;

    @ApiPropertyOptional({
        description: '댓글 id (답글 달기)'
    })
    @IsNumber()
    @IsOptional()
    parentId?: number;

    @ApiProperty({
        description: '댓글'
    })
    content: string;
}

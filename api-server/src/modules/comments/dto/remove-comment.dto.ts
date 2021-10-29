import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class RemoveCommentResponseDto {
    @ApiProperty()
    @IsBoolean()
    isDeleted: boolean;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpsertHashtagDto {
  @ApiProperty({
    description: '해시태그 이름'
  })
  @IsString()
  name: string;
}

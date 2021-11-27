import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReviewlikeDto {

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  reviewId : number;
}

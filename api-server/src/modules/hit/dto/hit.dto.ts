import {IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHitDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

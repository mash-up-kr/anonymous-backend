import { CDN_HOST } from '../../../constants';
import { ApiProperty } from '@nestjs/swagger';

export class UploadImageResposneDto {
  @ApiProperty({ description: `http://${CDN_HOST}/upload/{uuid}.png` })
  url: string;
}

import { Injectable } from '@nestjs/common';
import { getNetworkInfo } from '@mash-up-kr/nest-common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<div>Hello from admin-server</div><pre>${JSON.stringify(
      getNetworkInfo(),
      null,
      2,
    )}</pre>`;
  }
}

import { Injectable } from '@nestjs/common';
import { getNetworkInfo } from '@mash-up-kr/nest-common';

@Injectable()
export class AppService {
  health(): string {
    return `<div>Hello from updated-admin-server</div><pre>${JSON.stringify(
      getNetworkInfo(),
      null,
      2,
    )}</pre>`;
  }
}

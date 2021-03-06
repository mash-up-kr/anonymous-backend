import { Injectable } from '@nestjs/common';
import { getNetworkInfo } from '@mash-up-kr/nest-common';

@Injectable()
export class RootService {
  health(): string {
    return `<div>Hello from api-server</div><pre>${JSON.stringify(
      getNetworkInfo(),
      null,
      2,
    )}</pre>`;
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class PrivacyReplacer {
  replaceRequestBody(body: any) {
    if (body == null) return;
    if (typeof body === 'object') {
      if ('password' in body) {
        body.password = '<privacy-masked>';
      }
      if ('newPassword' in body) {
        body.newPassword = '<privacy-masked>';
      }
    }

    return body;
  }

  replaceResponseBody(body: any) {
    if (body == null) return;
    if (typeof body === 'object') {
      if ('token' in body) {
        body.token = '<privacy-masked>';
      }
      if ('accessToken' in body) {
        body.accessToken = '<privacy-masked>';
      }
    }

    return body;
  }

  replaceRequestHeader(headers: Record<string, any>): Record<string, any> {
    if ('authorization' in headers) {
      headers.authorization = '<privacy-masked>';
    }
    if ('Authorization' in headers) {
      headers.Authorization = '<privacy-masked>';
    }
    return headers;
  }

  replaceResponseHeader(headers: Record<string, any>) {
    return headers;
  }
}

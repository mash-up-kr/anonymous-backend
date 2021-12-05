import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { SentryService } from '@ntegral/nestjs-sentry';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  constructor(private readonly sentryService: SentryService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: any) => {
        const {
          path,
          params,
          body,
          headers,
        } = context.switchToHttp().getRequest<Request>();
        this.sentryService.instance().captureException(error, {
          extra: { path, params, body, headers },
        });
        throw error;
      }),
    );
  }
}

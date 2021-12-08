import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { PrivacyReplacer } from './PrivacyReplacer';
import { clone } from 'ramda';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private requestLogger = new Logger('HTTP_REQUEST');
  private responseLogger = new Logger('HTTP_RESPONSE');
  constructor(
    @Inject('LOGGING_IGNORE_PATH') private readonly loggingIgnorePath: string[],
    private readonly privacyReplacer: PrivacyReplacer,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const executionId = uuid();
    this.logRequest(context, executionId);

    return next.handle().pipe(
      catchError((error: any) => {
        console.log(error);
        this.logResponse(context, executionId, error);
        throw error;
      }),
      tap((data) => {
        this.logResponse(context, executionId, data);
      }),
    );
  }

  private logResponse(
    context: ExecutionContext,
    executionId: string,
    data: any,
  ) {
    if (this.isIgnorePath(context)) return;

    const response = context.switchToHttp().getResponse<Response>();
    const loggingParams: Record<string, any> = {
      executionId,
      user: this.getUser(context),
      headers: this.privacyReplacer.replaceResponseHeader(
        clone(response.header),
      ),
    };
    if (data instanceof Error) {
      loggingParams.error = { message: data.message };
    } else {
      loggingParams.body = this.privacyReplacer.replaceResponseBody(
        clone(data),
      );
    }

    this.responseLogger.log(JSON.stringify(loggingParams));
  }

  private logRequest(context: ExecutionContext, executionId: string) {
    if (this.isIgnorePath(context)) return;

    const request = context.switchToHttp().getRequest<Request>();
    this.requestLogger.log(
      JSON.stringify({
        executionId,
        user: this.getUser(context),
        path: request.path,
        body: this.privacyReplacer.replaceRequestBody(clone(request.body)),
        headers: this.privacyReplacer.replaceRequestHeader(
          clone(request.headers),
        ),
      }),
    );
  }

  private getUser(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.user == null || typeof request.user !== 'object') {
      return null;
    }

    const user = { ...request.user };
    delete user.password;

    return user;
  }

  private isIgnorePath(context: ExecutionContext): boolean {
    return this.loggingIgnorePath.includes(
      context.switchToHttp().getRequest<Request>().path,
    );
  }
}

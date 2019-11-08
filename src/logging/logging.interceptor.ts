import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const req = http.getRequest();
    if (!req) {
      return next.handle();
    }

    const { body } = req;
    const request: Request = req.req || req;
    Logger.log(
      `${request.url} <- ${body ? JSON.stringify(body) : ''} - ${request.ip}:${
        request.headers['user-agent']
      }`,
      request.method,
      false,
    );
    return next
      .handle()
      .pipe(
        tap(data =>
          Logger.log(
            `${request.url} -> ${JSON.stringify(data)}`,
            request.method,
          ),
        ),
      );
  }
}

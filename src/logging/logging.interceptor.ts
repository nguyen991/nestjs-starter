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
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request =
      http.getRequest() || GqlExecutionContext.create(context).getContext();

    if (!request) {
      return next.handle();
    }

    const { body } = request;
    const req: Request = request.req || request;
    Logger.log(
      `${req.url} <- ${body ? JSON.stringify(body) : ''} - ${req.ip}:${
        req.headers['user-agent']
      }`,
      req.method,
      false,
    );
    return next
      .handle()
      .pipe(
        tap(data =>
          Logger.log(`${req.url} -> ${JSON.stringify(data)}`, req.method),
        ),
      );
  }
}

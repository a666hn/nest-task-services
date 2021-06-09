import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

export interface Response<T> {
  httpCode: number;
  data: T;
}

@Injectable()
export class ResponseInterceptors<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map((data) => {
      const httpCode = context.getArgByIndex(1)?.statusCode
      return { httpCode, data }
    }));
  }
}
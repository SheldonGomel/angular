import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const youtubeApiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const keyAPI = 'xxx';
  const part = ['snippet', 'statistics'].join(',');

  const searchParams = {
    key: keyAPI,
    type: 'video',
    part: 'snippet',
    maxResults: '15',
    // q: 'angular',
  };
  const getDataParams = {
    key: keyAPI,
    part,
  };
  const params = req.url.includes('search') ? searchParams : getDataParams;

  const newReq = req.clone({
    setParams: params,
  });

  return next(newReq);
};

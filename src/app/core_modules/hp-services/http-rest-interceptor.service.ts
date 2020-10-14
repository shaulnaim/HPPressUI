import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment as env } from 'devEnv';
import { ErrorWithComponentSource, ExceptionComponentSource } from './error-handler.service';
import { Utils } from './utils.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  private _baseURL: string;

  constructor() {
    this._baseURL = 'http://' + Utils.getUrlParameter('ip', 'localhost') + ':' + env.REST_PORT + '/api/';
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      url: this.buildUrl(request.url),
      headers: this.processHeaders(request.headers)
    });

    return next.handle(modifiedRequest).pipe(catchError(this.handleError));
  }

  private buildUrl(requestUrl: string): string {
    if (requestUrl === null) throw new Error('uri is null');
    return this._baseURL + requestUrl;
  }

  private processHeaders(originalHeaders: HttpHeaders): HttpHeaders {
    let headers = new HttpHeaders({
      ClientID: Utils.clientId,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });

    for (const key of originalHeaders.keys()) {
      headers = headers.append(key, originalHeaders.get(key));
    }

    return headers;
  }

  private handleError(error: HttpErrorResponse) {
    const errWithComponent = new ErrorWithComponentSource();

    errWithComponent.componentSource = ExceptionComponentSource.UI;
    errWithComponent.message = 'Error: ' + error.message;

    return throwError(errWithComponent);
  }
}

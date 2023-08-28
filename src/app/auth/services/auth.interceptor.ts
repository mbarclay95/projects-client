import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthStorageService} from "./auth-storage.service";
import {Router} from "@angular/router";
import {environment} from '../../../environments/environment';
import {AuthQuery} from './state/auth.query';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authStorageService: AuthStorageService,
    private router: Router,
    private authQuery: AuthQuery,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authToken: string | undefined;
    if (request.url.includes(environment.apiUrl)) {
      authToken = this.authStorageService.getAuthToken();
    } else if (request.url.includes(environment.moneyAppApiUrl)) {
      authToken = this.authQuery.getUser().userConfig.moneyAppToken ?? undefined;
    }

    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
          Accept: 'application/json'
        }
      });
    }

    const res = next.handle(request);
    return res.pipe(
      catchError(error => {
        if (error.status === 403) {
          this.router.navigateByUrl('login');
        }

        return throwError(error);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {AuthStorageService} from "./auth-storage.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authStorageService: AuthStorageService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authStorageService.getAuthToken();

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

        return of();
      })
    );
  }
}

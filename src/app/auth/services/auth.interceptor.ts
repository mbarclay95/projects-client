import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthStorageService } from './auth-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authStorageService = inject(AuthStorageService);
  private router = inject(Router);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authToken: string | undefined;
    if (request.url.includes(environment.apiUrl)) {
      authToken = this.authStorageService.getAuthToken();
    } else if (request.url.includes(environment.moneyAppApiUrl)) {
      authToken = this.authStorageService.getMoneyAppAuthToken();
    }

    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
          Accept: 'application/json',
        },
      });
    }

    const res = next.handle(request);
    return res.pipe(
      catchError((error) => {
        if (error.status === 403) {
          console.error('unauthorized');
          this.router.navigateByUrl('login');
        }

        return throwError(error);
      }),
    );
  }
}

import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './auth/services/auth.interceptor';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';

const ngZorroConfig: NzConfig = {};

export const appConfig: ApplicationConfig = {
  providers: [
    provideNzConfig(ngZorroConfig),
    provideBrowserGlobalErrorListeners(),
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideZonelessChangeDetection(),
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideNzNoAnimation(),
    provideRouter(APP_ROUTES),
  ],
};

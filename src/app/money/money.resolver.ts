import { inject, Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthSignalStore } from '../auth/services/auth-signal-store';

@Injectable({
  providedIn: 'root',
})
export class MoneyResolver {
  private authStore = inject(AuthSignalStore);
  private router = inject(Router);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authStore.hasMoneyAppToken()) {
      void this.router.navigateByUrl('/app/money/incorrect-config');
    }

    return true;
  }
}

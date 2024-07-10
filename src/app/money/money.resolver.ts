import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import {AuthQuery} from '../auth/services/state/auth.query';

@Injectable({
  providedIn: 'root'
})
export class MoneyResolver  {

  constructor(
    private authQuery: AuthQuery,
    private router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authQuery.hasMoneyAppToken()) {
      void this.router.navigateByUrl('/app/money/incorrect-config');
    }

    return true;
  }
}

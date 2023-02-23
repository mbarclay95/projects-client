import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {MobileFooterService} from './shared/services/mobile-footer.service';
import {MobileHeaderService} from './shared/services/mobile-header.service';
import {MobileHeaderResolver} from './mobile-header.resolver';

@Injectable({
  providedIn: 'root'
})
export class AppResolver implements Resolve<void> {

  constructor(
    private mobileFooterService: MobileFooterService,
    private mobileHeaderService: MobileHeaderService,
    private mobileHeaderResolver: MobileHeaderResolver,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    this.mobileFooterService.clearFooterButtons();
    this.mobileHeaderResolver.resolve(route, state);
  }
}

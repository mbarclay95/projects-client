import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { MobileFooterService } from './shared/services/mobile-footer.service';

@Injectable({
  providedIn: 'root',
})
export class AppResolver {
  constructor(private mobileFooterService: MobileFooterService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    this.mobileFooterService.clearFooterButtons();
  }
}

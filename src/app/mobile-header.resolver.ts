import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { MobileHeaderService } from './shared/services/mobile-header.service';

@Injectable({
  providedIn: 'root',
})
export class MobileHeaderResolver {
  constructor(private mobileHeaderService: MobileHeaderService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    if (route.data['headerTitle']) {
      this.mobileHeaderService.setTitle(route.data['headerTitle']);
    }
    if (route.data['showCreateButton']) {
      this.mobileHeaderService.showCreateButton();
    } else {
      this.mobileHeaderService.hideCreateButton();
    }
  }
}

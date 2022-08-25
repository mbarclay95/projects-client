import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {GoalsService} from "./services/state/goals.service";
import {MobileFooterService} from "../shared/services/mobile-footer.service";
import {MobileHeaderService} from "../shared/services/mobile-header.service";

@Injectable({
  providedIn: 'root'
})
export class GoalsResolver implements Resolve<void> {

  constructor(
    private goalsService: GoalsService,
    private mobileFooterService: MobileFooterService,
    private mobileHeaderService: MobileHeaderService
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    this.mobileHeaderService.setTitle('Goals');
    this.mobileHeaderService.hideCreateButton();
    await this.goalsService.getAllGoals();
    this.mobileFooterService.setFooterButtons([]);
  }
}

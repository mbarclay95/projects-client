import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {FoldersService} from "./services/folder/state/folders.service";
import {MobileFooterService} from "../shared/services/mobile-footer.service";
import {MobileHeaderService} from "../shared/services/mobile-header.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<void> {

  constructor(
    private foldersService: FoldersService,
    private mobileFooterService: MobileFooterService,
    private mobileHeaderService: MobileHeaderService
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    this.mobileHeaderService.setTitle('Dashboard');
    this.mobileHeaderService.hideCreateButton();
    await this.foldersService.getFolders();
    this.mobileFooterService.setFooterButtons([]);
  }
}

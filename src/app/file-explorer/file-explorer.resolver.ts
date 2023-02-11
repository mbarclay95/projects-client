import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {MobileFooterService} from '../shared/services/mobile-footer.service';
import {DirectoryItemsService} from './services/state/directory-items.service';

@Injectable({
  providedIn: 'root'
})
export class FileExplorerResolver implements Resolve<void> {

  constructor(
    private directoriesService: DirectoryItemsService,
    private mobileFooterService: MobileFooterService,
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    await this.directoriesService.getItems();
    this.mobileFooterService.setFooterButtons([]);
  }
}

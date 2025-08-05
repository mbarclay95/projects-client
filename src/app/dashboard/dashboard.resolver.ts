import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { FoldersService } from './services/folder/state/folders.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardResolver {
  constructor(private foldersService: FoldersService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    await this.foldersService.getFolders();
  }
}

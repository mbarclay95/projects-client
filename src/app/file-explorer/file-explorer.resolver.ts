import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FileExplorerResolver implements Resolve<void> {

  constructor(
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
  }
}

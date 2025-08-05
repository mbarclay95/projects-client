import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FileExplorerResolver {
  constructor() {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {}
}

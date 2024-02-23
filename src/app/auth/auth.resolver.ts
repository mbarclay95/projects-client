import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {RolesService} from '../users/services/roles/state/roles.service';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<Promise<void>> {
  constructor(
    private rolesService: RolesService,
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    await Promise.all([
      this.rolesService.getRoles()
    ]);
  }

}

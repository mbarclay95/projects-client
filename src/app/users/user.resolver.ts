import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {UsersService} from "./services/state/users.service";
import {RolesService} from "./services/roles/state/roles.service";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<void> {

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    await Promise.all([
      this.usersService.getUsers(),
      this.rolesService.getRoles()
    ]);
  }
}

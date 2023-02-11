import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./state/auth.service";
import {AuthQuery} from "./state/auth.query";
import {PermissionsService} from "./permissions.service";
import {Permissions} from "../permissions";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private authQuery: AuthQuery,
    private router: Router,
    private permissionsService: PermissionsService
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      await this.authService.getMe();
    } catch (e) {
      await this.router.navigateByUrl('login');
      return false;
    }

    return this.authQuery.isLoggedIn();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const hasPermission = this.permissionsService.hasPermissionTo(childRoute.data['permission'] as unknown as Permissions|undefined);

    if (!hasPermission) {
      void this.router.navigateByUrl('login');
    }

    return hasPermission;
  }



}

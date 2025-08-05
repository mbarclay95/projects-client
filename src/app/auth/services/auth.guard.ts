import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './state/auth.service';
import { AuthQuery } from './state/auth.query';
import { PermissionsService } from './permissions.service';
import { Permissions } from '../permissions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private authQuery: AuthQuery,
    private router: Router,
    private permissionsService: PermissionsService,
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      await this.authService.getMe();
    } catch (e) {
      console.log(e);
      await this.router.navigateByUrl('login');
      return false;
    }
    const hasPermission = this.permissionsService.hasPermissionTo(route.data['permission'] as unknown as Permissions | undefined);
    if (!hasPermission) {
      console.log(`does not have ${route.data['permission']} permission`);
      void this.router.navigateByUrl('my-profile');
    }

    return this.authQuery.isLoggedIn();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const hasPermission = this.permissionsService.hasPermissionTo(childRoute.data['permission'] as unknown as Permissions | undefined);

    if (!hasPermission) {
      console.log(`does not have ${childRoute.data['permission']} permission`);
      void this.router.navigateByUrl('my-profile');
    }

    return hasPermission;
  }
}

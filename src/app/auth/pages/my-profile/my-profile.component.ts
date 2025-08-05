import { Component, OnInit } from '@angular/core';
import { AuthQuery } from '../../services/state/auth.query';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/state/auth.service';
import { User } from '../../../users/models/user.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { Permissions, Roles } from '../../permissions';
import { PermissionsService } from '../../services/permissions.service';
import { UserConfig } from '../../../users/models/user-config.model';
import { RolesQuery } from '../../../users/services/roles/state/roles.query';
import { Role } from '../../../users/models/role.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  loggingOut = false;
  changePasswordModal: Subject<void> = new Subject<void>();

  moneyPermission = Permissions.MONEY_APP_PAGE;

  constructor(
    public authQuery: AuthQuery,
    private authService: AuthService,
    private nzMessageService: NzMessageService,
    private router: Router,
    public permissionsService: PermissionsService,
    public rolesQuery: RolesQuery,
  ) {}

  ngOnInit(): void {}

  async updateMe(changes: Partial<User>): Promise<void> {
    try {
      await this.authService.updateMe(changes);
    } catch (e) {
      this.nzMessageService.error('There was an error');
    }
  }

  async updateUserConfig(changes: Partial<UserConfig>): Promise<void> {
    try {
      await this.authService.updateUserConfig(changes);
    } catch (e) {
      this.nzMessageService.error('There was an error');
    }
  }

  async logout(): Promise<void> {
    this.loggingOut = true;
    try {
      await this.authService.logout();
    } catch (e) {
      console.log(e);
      this.nzMessageService.error('There was an error logging out');
      this.loggingOut = false;
      return;
    }

    this.nzMessageService.success('You have been logged out');
    this.loggingOut = false;
    await this.router.navigateByUrl('/login');
  }

  async updateUsersRoles(checked: boolean, role: Role, user: User) {
    let newRoles = [...user.roles];
    if (checked) {
      newRoles.push(role);
    } else {
      newRoles = newRoles.filter((r) => r.id !== role.id);
    }
    await this.updateMe({ roles: newRoles });

    let userHomePageRole = user.userConfig.homePageRole;
    if (!newRoles.find((r) => r.name === userHomePageRole)) {
      userHomePageRole = newRoles.length === 0 ? null : (newRoles[0].name as Roles);
      await this.updateUserConfig({ homePageRole: userHomePageRole });
    }
  }
}

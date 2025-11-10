import { Component, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../../users/models/user.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { Permissions, Roles } from '../../permissions';
import { UserConfig } from '../../../users/models/user-config.model';
import { Role } from '../../../users/models/role.model';
import { AuthSignalStore } from '../../services/auth-signal-store';
import { RolesSignalStore } from '../../../users/services/roles-signal-store';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  standalone: false,
})
export class MyProfileComponent {
  loggingOut = false;
  changePasswordModal: Subject<void> = new Subject<void>();

  moneyPermission = Permissions.MONEY_APP_PAGE;

  readonly authStore = inject(AuthSignalStore);
  readonly rolesStore = inject(RolesSignalStore);

  constructor(
    private nzMessageService: NzMessageService,
    private router: Router,
  ) {}

  updateMe(changes: Partial<User>): void {
    try {
      this.authStore.updateMe({ changes });
    } catch (e) {
      this.nzMessageService.error('There was an error');
    }
  }

  updateUserConfig(changes: Partial<UserConfig>): void {
    try {
      this.authStore.updateUserConfig(changes);
    } catch (e) {
      this.nzMessageService.error('There was an error');
    }
  }

  async logout(): Promise<void> {
    this.loggingOut = true;
    try {
      await this.authStore.logout();
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

  updateUsersRoles(checked: boolean, role: Role, user: User): void {
    let newRoles = [...user.roles];
    if (checked) {
      newRoles.push(role);
    } else {
      newRoles = newRoles.filter((r) => r.id !== role.id);
    }
    this.updateMe({ roles: newRoles });

    let userHomePageRole = user.userConfig.homePageRole;
    if (!newRoles.find((r) => r.name === userHomePageRole)) {
      userHomePageRole = newRoles.length === 0 ? null : (newRoles[0].name as Roles);
      this.updateUserConfig({ homePageRole: userHomePageRole });
    }
  }
}

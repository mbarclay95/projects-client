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
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { ChangePasswordModalComponent } from '../../components/change-password-modal/change-password-modal.component';
import { DisplayRoleNamePipe } from '../../../shared/pipes/display-role-name.pipe';
import { HasRolePipe } from '../../../shared/pipes/has-role.pipe';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  imports: [
    NzDividerComponent,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    NzButtonComponent,
    NzSwitchComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzPopconfirmDirective,
    ChangePasswordModalComponent,
    DisplayRoleNamePipe,
    HasRolePipe,
  ],
})
export class MyProfileComponent {
  private nzMessageService = inject(NzMessageService);
  private router = inject(Router);

  loggingOut = false;
  changePasswordModal: Subject<void> = new Subject<void>();

  moneyPermission = Permissions.MONEY_APP_PAGE;

  readonly authStore = inject(AuthSignalStore);
  readonly rolesStore = inject(RolesSignalStore);

  updateMe(changes: Partial<User>): void {
    try {
      this.authStore.updateMe({ changes });
    } catch (_e) {
      this.nzMessageService.error('There was an error');
    }
  }

  updateUserConfig(changes: Partial<UserConfig>): void {
    try {
      this.authStore.updateUserConfig(changes);
    } catch (_e) {
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

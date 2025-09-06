import { Component, inject } from '@angular/core';
import { User } from '../../models/user.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Role } from '../../models/role.model';
import { Roles } from '../../../auth/permissions';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { UsersSignalStore } from '../../services/users-signal-store';
import { RolesSignalStore } from '../../services/roles-signal-store';

@Component({
  selector: 'app-create-edit-user-modal',
  templateUrl: './create-edit-user-modal.component.html',
  styleUrls: ['./create-edit-user-modal.component.scss'],
  standalone: false,
})
export class CreateEditUserModalComponent extends DefaultModalSignalComponent<User> {
  readonly usersStore = inject(UsersSignalStore);
  readonly rolesStore = inject(RolesSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  updateUsersRoles(checked: boolean, role: Role) {
    if (!this.model) {
      return;
    }
    if (checked) {
      this.model.roles.push(role);
    } else {
      this.model.roles = this.model.roles.filter((r) => r.id !== role.id);
    }

    const userHomePageRole = this.model.userConfig.homePageRole;
    if (!this.model.roles.find((r) => r.name === userHomePageRole)) {
      if (this.model.roles.length > 0) {
        this.updateUserHomePage(this.model.roles[0].name as Roles);
      }
    }
  }

  async saveUser() {
    if (!this.model) {
      return;
    }
    this.model.id === 0
      ? this.usersStore.create({ entity: this.model, onSuccess: () => this.userSaved() })
      : this.usersStore.update({ entity: this.model, onSuccess: () => this.userSaved() });
  }

  private userSaved() {
    this.usersStore.clearSelectedEntity();
    this.nzMessageService.success('User saved successfully.');
  }

  updateUserHomePage(roleName: Roles) {
    if (!this.model) {
      return;
    }
    this.model.userConfig.homePageRole = roleName;
  }
}

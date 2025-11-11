import { Component, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { createNewUserWithDefaultRole, createUser, User } from '../../models/user.model';
import { Roles } from '../../../auth/permissions';
import { isMobile } from '../../../app.component';
import { UsersSignalStore } from '../../services/users-signal-store';
import { RolesSignalStore } from '../../services/roles-signal-store';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { CreateEditUserModalComponent } from '../../components/create-edit-user-modal/create-edit-user-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  imports: [PageHeaderComponent, NzSpinComponent, UserTableComponent, CreateEditUserModalComponent, NzModalModule],
})
export class UsersPageComponent {
  isMobile = isMobile;

  readonly usersStore = inject(UsersSignalStore);
  readonly rolesStore = inject(RolesSignalStore);

  createNewUser() {
    this.usersStore.createEntity(createNewUserWithDefaultRole(this.rolesStore.entities()));
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { createUser, User } from '../../models/user.model';
import { Roles } from '../../../auth/permissions';
import { isMobile } from '../../../app.component';
import { map } from 'rxjs/operators';
import { MobileDisplayService } from '../../../shared/services/mobile-display.service';
import { UsersSignalStore } from '../../services/users-signal-store';
import { RolesSignalStore } from '../../services/roles-signal-store';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { CreateEditUserModalComponent } from '../../components/create-edit-user-modal/create-edit-user-modal.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  imports: [PageHeaderComponent, NzSpinComponent, UserTableComponent, CreateEditUserModalComponent],
})
export class UsersPageComponent implements OnInit {
  openUserModal: Subject<User> = new Subject<User>();
  isMobile = isMobile;
  openUserModal$: Observable<User> = merge(
    this.mobileHeaderService.clickedButton$.pipe(map(() => this.getNewUser())),
    this.openUserModal.asObservable(),
  );
  readonly usersStore = inject(UsersSignalStore);
  readonly rolesStore = inject(RolesSignalStore);

  constructor(private mobileHeaderService: MobileDisplayService) {}

  ngOnInit(): void {}

  getNewUser(): User {
    const dashboardRole = this.rolesStore.entities().find((r) => r.name === Roles.DASHBOARD_ROLE);
    const roles = dashboardRole ? [dashboardRole] : [];
    return createUser({ id: 0, roles: roles });
  }

  createNewUser() {
    this.openUserModal.next(this.getNewUser());
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { createUser, User } from '../../models/user.model';
import { Roles } from '../../../auth/permissions';
import { isMobile } from '../../../app.component';
import { map } from 'rxjs/operators';
import { MobileHeaderService } from '../../../shared/services/mobile-header.service';
import { UsersSignalStore } from '../../services/users-signal-store';
import { RolesSignalStore } from '../../services/roles-signal-store';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  standalone: false,
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

  constructor(private mobileHeaderService: MobileHeaderService) {}

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

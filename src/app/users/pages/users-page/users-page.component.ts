import { Component, OnInit } from '@angular/core';
import { UsersQuery } from '../../services/state/users.query';
import { merge, Observable, Subject } from 'rxjs';
import { createUser, User } from '../../models/user.model';
import { RolesQuery } from '../../services/roles/state/roles.query';
import { Roles } from '../../../auth/permissions';
import { isMobile } from '../../../app.component';
import { map } from 'rxjs/operators';
import { MobileHeaderService } from '../../../shared/services/mobile-header.service';

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

  constructor(
    public usersQuery: UsersQuery,
    private rolesQuery: RolesQuery,
    private mobileHeaderService: MobileHeaderService,
  ) {}

  ngOnInit(): void {}

  getNewUser(): User {
    const dashboardRole = this.rolesQuery.getAll().find((r) => r.name === Roles.DASHBOARD_ROLE);
    const roles = dashboardRole ? [dashboardRole] : [];
    return createUser({ id: 0, roles: roles });
  }

  createNewUser() {
    this.openUserModal.next(this.getNewUser());
  }
}

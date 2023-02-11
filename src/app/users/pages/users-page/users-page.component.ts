import { Component, OnInit } from '@angular/core';
import {UsersQuery} from "../../services/state/users.query";
import {Subject} from "rxjs";
import {createUser, User} from "../../models/user.model";
import {RolesQuery} from "../../services/roles/state/roles.query";
import {Roles} from "../../../auth/permissions";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  openUserModal: Subject<User> = new Subject<User>();
  isMobile = screen.width < 600;

  constructor(
    public usersQuery: UsersQuery,
    private rolesQuery: RolesQuery
  ) { }

  ngOnInit(): void {
  }

  createNewUser() {
    const dashboardRole = this.rolesQuery.getAll().find(r => r.name === Roles.DASHBOARD_ROLE);
    const roles = dashboardRole ? [dashboardRole] : [];
    this.openUserModal.next(createUser({id: 0, roles: roles}));
  }

}

import { Component, OnInit } from '@angular/core';
import {UsersQuery} from "../../services/state/users.query";
import {Subject} from "rxjs";
import {createUser, User} from "../../models/user.model";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  openUserModal: Subject<User> = new Subject<User>();

  constructor(
    public usersQuery: UsersQuery
  ) { }

  ngOnInit(): void {
  }

  createNewUser() {
    this.openUserModal.next(createUser({id: 0}));
  }

}

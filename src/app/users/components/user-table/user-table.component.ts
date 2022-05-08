import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NzTableComponent} from "ng-zorro-antd/table";
import {User} from "../../models/user.model";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {Subject} from "rxjs";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @ViewChild('usersTableTag', {static: true}) usersTable: NzTableComponent<User> | undefined;
  @Input() set users(users: User[] | null) {
    if (users) {
      this._users = users;
    }
  }

  _users: User[] = [];
  edit = faEdit;
  openUserModal: Subject<User> = new Subject<User>();

  constructor(

  ) { }

  ngOnInit(): void {
  }

}

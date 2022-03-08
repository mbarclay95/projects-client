import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NzTableComponent} from "ng-zorro-antd/table";
import {User} from "../../models/user.model";

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

  constructor(

  ) { }

  ngOnInit(): void {
  }

}

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { User } from '../../models/user.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  standalone: false,
})
export class UserTableComponent implements OnInit {
  @ViewChild('usersTableTag', { static: true }) usersTable: NzTableComponent<User> | undefined;
  @Input() set users(users: User[] | null) {
    if (users) {
      this._users = users;
    }
  }
  @Output() editUser: EventEmitter<number> = new EventEmitter<number>();

  _users: User[] = [];
  edit = faEdit;

  constructor() {}

  ngOnInit(): void {}
}

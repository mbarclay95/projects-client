import { Component, OnInit } from '@angular/core';
import {UsersQuery} from "../../services/state/users.query";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  constructor(
    public usersQuery: UsersQuery
  ) { }

  ngOnInit(): void {
  }

}

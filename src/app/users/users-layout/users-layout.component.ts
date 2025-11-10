import { Component, OnInit } from '@angular/core';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users-layout',
  templateUrl: './users-layout.component.html',
  styleUrls: ['./users-layout.component.scss'],
  imports: [NzContentComponent, RouterOutlet],
})
export class UsersLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

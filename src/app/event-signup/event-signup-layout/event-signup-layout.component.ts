import { Component, OnInit } from '@angular/core';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-event-signup-layout',
  templateUrl: './event-signup-layout.component.html',
  styleUrls: ['./event-signup-layout.component.scss'],
  imports: [NzContentComponent, RouterOutlet],
})
export class EventSignupLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

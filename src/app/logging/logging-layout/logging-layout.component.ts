import { Component, OnInit } from '@angular/core';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-logging-layout',
  templateUrl: './logging-layout.component.html',
  styleUrls: ['./logging-layout.component.scss'],
  imports: [NzContentComponent, RouterOutlet],
})
export class LoggingLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

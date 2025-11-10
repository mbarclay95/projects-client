import { Component, OnInit } from '@angular/core';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-backups-layout',
  templateUrl: './backups-layout.component.html',
  styleUrls: ['./backups-layout.component.scss'],
  imports: [NzContentComponent, RouterOutlet],
})
export class BackupsLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

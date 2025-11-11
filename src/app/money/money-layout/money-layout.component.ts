import { Component } from '@angular/core';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-money-layout',
  templateUrl: './money-layout.component.html',
  styleUrls: ['./money-layout.component.scss'],
  imports: [NzContentComponent, RouterOutlet],
})
export class MoneyLayoutComponent {}

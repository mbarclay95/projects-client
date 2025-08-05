import { Component } from '@angular/core';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-gaming-layout',
  imports: [NzContentComponent, RouterOutlet],
  templateUrl: './gaming-layout.component.html',
  styleUrl: './gaming-layout.component.scss',
})
export class GamingLayoutComponent {}

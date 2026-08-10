import { Component } from '@angular/core';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-drafts-layout',
  templateUrl: './drafts-layout.component.html',
  styleUrls: ['./drafts-layout.component.scss'],
  imports: [NzContentComponent, RouterOutlet],
})
export class DraftsLayoutComponent {}

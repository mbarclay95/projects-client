import { Component } from '@angular/core';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-draft-layout',
  templateUrl: './draft-layout.component.html',
  styleUrls: ['./draft-layout.component.scss'],
  imports: [NzContentComponent, RouterOutlet],
})
export class DraftLayoutComponent {}

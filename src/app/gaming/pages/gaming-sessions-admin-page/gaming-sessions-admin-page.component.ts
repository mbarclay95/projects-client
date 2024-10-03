import { Component } from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {GamingSegmentComponent} from '../../components/gaming-segment/gaming-segment.component';
import {GamingSessionsFacadeService} from '../../services/gaming-sessions-facade.service';
import {NzSpinComponent} from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-gaming-sessions-admin-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    GamingSegmentComponent,
    NzSpinComponent
  ],
  templateUrl: './gaming-sessions-admin-page.component.html',
  styleUrl: './gaming-sessions-admin-page.component.scss'
})
export class GamingSessionsAdminPageComponent {
  tab: 'sessions' | 'devices' = 'sessions';

  constructor(
    public gamingSessionsFacadeService: GamingSessionsFacadeService
  ) {
  }

}

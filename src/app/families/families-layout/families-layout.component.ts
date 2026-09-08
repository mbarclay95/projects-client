import { Component, inject } from '@angular/core';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';
import { UserGroupsSignalStore } from '../../shared/services/user-groups-signal-store';

@Component({
  selector: 'app-families-layout',
  templateUrl: './families-layout.component.html',
  styleUrls: ['./families-layout.component.scss'],
  imports: [NzContentComponent, RouterOutlet],
})
export class FamiliesLayoutComponent {
  readonly familiesStore = inject(UserGroupsSignalStore);

  constructor() {
    this.familiesStore.loadAll({});
  }
}

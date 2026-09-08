import { Component, inject } from '@angular/core';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';
import { UserGroupsSignalStore } from '../../shared/services/user-groups-signal-store';

@Component({
  selector: 'app-user-groups-layout',
  templateUrl: './user-groups-layout.component.html',
  styleUrls: ['./user-groups-layout.component.scss'],
  imports: [NzContentComponent, RouterOutlet],
})
export class UserGroupsLayoutComponent {
  readonly familiesStore = inject(UserGroupsSignalStore);

  constructor() {
    this.familiesStore.loadAll({});
  }
}

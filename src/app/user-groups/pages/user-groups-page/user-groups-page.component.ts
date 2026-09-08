import { Component, inject } from '@angular/core';
import { isMobile } from '../../../app.component';
import { UsersSignalStore } from '../../../users/services/users-signal-store';
import { UserGroupsSignalStore } from '../../../shared/services/user-groups-signal-store';
import { UserGroupsTableComponent } from '../../components/user-groups-table/user-groups-table.component';
import { CreateEditUserGroupModalComponent } from '../../components/create-edit-user-group-modal/create-edit-user-group-modal.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { NzSpinComponent } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-user-groups-page',
  templateUrl: './user-groups-page.component.html',
  styleUrls: ['./user-groups-page.component.scss'],
  imports: [UserGroupsTableComponent, CreateEditUserGroupModalComponent, PageHeaderComponent, NzSpinComponent],
})
export class UserGroupsPageComponent {
  isMobile = isMobile;

  readonly usersStore = inject(UsersSignalStore);
  readonly familiesStore = inject(UserGroupsSignalStore);
}

import { Component, inject } from '@angular/core';
import { isMobile } from '../../../app.component';
import { UsersSignalStore } from '../../../users/services/users-signal-store';
import { UserGroupsSignalStore } from '../../../shared/services/user-groups-signal-store';
import { FamiliesTableComponent } from '../../components/families-table/families-table.component';
import { CreateEditFamilyModalComponent } from '../../components/create-edit-family-modal/create-edit-family-modal.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { NzSpinComponent } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-families-page',
  templateUrl: './families-page.component.html',
  styleUrls: ['./families-page.component.scss'],
  imports: [FamiliesTableComponent, CreateEditFamilyModalComponent, PageHeaderComponent, NzSpinComponent],
})
export class FamiliesPageComponent {
  isMobile = isMobile;

  readonly usersStore = inject(UsersSignalStore);
  readonly familiesStore = inject(UserGroupsSignalStore);
}

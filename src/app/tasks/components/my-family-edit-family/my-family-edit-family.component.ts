import { Component, inject, Input } from '@angular/core';
import { UserGroup } from '../../../shared/models/user-group.model';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { UserGroupsSignalStore } from '../../../shared/services/user-groups-signal-store';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { CreateEditUserGroupModalComponent } from '../../../user-groups/components/create-edit-user-group-modal/create-edit-user-group-modal.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-my-family-edit-family',
  templateUrl: './my-family-edit-family.component.html',
  styleUrls: ['./my-family-edit-family.component.scss'],
  imports: [FaIconComponent, NzDividerComponent, CreateEditUserGroupModalComponent, DecimalPipe],
})
export class MyFamilyEditFamilyComponent {
  @Input() myFamily!: UserGroup;

  settings = faCog;

  readonly familiesStore = inject(UserGroupsSignalStore);
}

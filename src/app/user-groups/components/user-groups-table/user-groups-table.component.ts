import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
  NzTableComponent,
  NzTheadComponent,
  NzTrDirective,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTbodyComponent,
} from 'ng-zorro-antd/table';
import { UserGroup } from '../../../shared/models/user-group.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user-groups-table',
  templateUrl: './user-groups-table.component.html',
  styleUrls: ['./user-groups-table.component.scss'],
  imports: [
    NzTableComponent,
    NzTheadComponent,
    NzTrDirective,
    NzTableCellDirective,
    NzThMeasureDirective,
    NzTbodyComponent,
    NzButtonComponent,
    FaIconComponent,
  ],
})
export class UserGroupsTableComponent {
  @ViewChild('groupsTableTag', { static: true }) groupsTable: NzTableComponent<UserGroup> | undefined;
  @Input() set groups(groups: UserGroup[] | null) {
    if (groups) {
      this._groups = groups;
    }
  }
  @Output() openUserGroupModal: EventEmitter<number> = new EventEmitter<number>();

  _groups: UserGroup[] = [];
  edit = faEdit;
}

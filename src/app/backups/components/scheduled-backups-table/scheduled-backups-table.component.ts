import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  NzTableComponent,
  NzTheadComponent,
  NzTrDirective,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTbodyComponent,
} from 'ng-zorro-antd/table';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Schedule } from '../../models/schedule.model';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-scheduled-backups-table',
  templateUrl: './scheduled-backups-table.component.html',
  styleUrls: ['./scheduled-backups-table.component.scss'],
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
export class ScheduledBackupsTableComponent implements OnInit {
  @ViewChild('scheduledBackupsTableTag', { static: true }) scheduledBackupsTable: NzTableComponent<Schedule> | undefined;
  @Input() set schedules(schedules: Schedule[] | null) {
    if (schedules) {
      this._schedules = schedules;
    }
  }
  @Output() editScheduledBackup: EventEmitter<Schedule> = new EventEmitter<Schedule>();

  _schedules: Schedule[] = [];
  edit = faEdit;

  constructor() {}

  ngOnInit(): void {}
}

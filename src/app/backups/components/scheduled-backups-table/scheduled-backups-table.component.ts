import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Schedule } from '../../models/schedule.model';

@Component({
  selector: 'app-scheduled-backups-table',
  templateUrl: './scheduled-backups-table.component.html',
  styleUrls: ['./scheduled-backups-table.component.scss'],
  standalone: false,
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

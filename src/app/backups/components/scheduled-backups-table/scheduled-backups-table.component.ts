import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NzTableComponent} from "ng-zorro-antd/table";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {Schedule} from '../../models/scheduled.model';

@Component({
  selector: 'app-scheduled-backups-table',
  templateUrl: './scheduled-backups-table.component.html',
  styleUrls: ['./scheduled-backups-table.component.scss']
})
export class ScheduledBackupsTableComponent implements OnInit {
  @ViewChild('scheduledBackupsTableTag', {static: true}) scheduledBackupsTable: NzTableComponent<Schedule> | undefined;
  @Input() set scheduledBackups(scheduledBackups: Schedule[] | null) {
    if (scheduledBackups) {
      this._scheduleBackups = scheduledBackups;
    }
  };
  @Output() editScheduledBackup: EventEmitter<Schedule> = new EventEmitter<Schedule>();

  _scheduleBackups: Schedule[] = [];
  edit = faEdit;

  constructor() { }

  ngOnInit(): void {
  }

}

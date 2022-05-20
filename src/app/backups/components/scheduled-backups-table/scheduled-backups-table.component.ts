import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NzTableComponent} from "ng-zorro-antd/table";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {ScheduledBackup} from "../../models/scheduled-backup.model";

@Component({
  selector: 'app-scheduled-backups-table',
  templateUrl: './scheduled-backups-table.component.html',
  styleUrls: ['./scheduled-backups-table.component.scss']
})
export class ScheduledBackupsTableComponent implements OnInit {
  @ViewChild('scheduledBackupsTableTag', {static: true}) scheduledBackupsTable: NzTableComponent<ScheduledBackup> | undefined;
  @Input() set scheduledBackups(scheduledBackups: ScheduledBackup[] | null) {
    if (scheduledBackups) {
      this._scheduleBackups = scheduledBackups;
    }
  };
  @Output() editScheduledBackup: EventEmitter<ScheduledBackup> = new EventEmitter<ScheduledBackup>();

  _scheduleBackups: ScheduledBackup[] = [];
  edit = faEdit;

  constructor() { }

  ngOnInit(): void {
  }

}

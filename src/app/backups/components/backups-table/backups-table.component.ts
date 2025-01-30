import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NzTableComponent} from "ng-zorro-antd/table";
import {Backup} from "../../models/backup.model";
import {
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import {BackupsService} from '../../services/backups/state/backups.service';
import {BackupsPollingService} from '../../services/backups-polling.service';

@Component({
  selector: 'app-backups-table',
  templateUrl: './backups-table.component.html',
  styleUrls: ['./backups-table.component.scss']
})
export class BackupsTableComponent implements OnInit {
  @ViewChild('backupsTableTag', {static: true}) backupsTable: NzTableComponent<Backup> | undefined;
  @Input() set backups(backups: Backup[] | null) {
    if (backups) {
      this._backups = backups;
    }
  }

  _backups: Backup[] = [];
  expandSet = new Set<number>();
  play = faPlay;

  constructor(
    private backupsService: BackupsService,
    private backupsPollingService: BackupsPollingService
  ) { }

  ngOnInit(): void {
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  runBackup(backup: Backup): void {
    void this.backupsService.runBackup(backup.id);
    void this.backupsService.getBackups();
    this.backupsPollingService.startPolling();
  }
}

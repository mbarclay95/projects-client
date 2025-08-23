import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { Backup } from '../../models/backup.model';
import { faArchive, faEdit, faPlay } from '@fortawesome/free-solid-svg-icons';
import { BackupsSignalStore } from '../../services/backups-signal-store';

@Component({
  selector: 'app-backups-table',
  templateUrl: './backups-table.component.html',
  styleUrls: ['./backups-table.component.scss'],
  standalone: false,
})
export class BackupsTableComponent {
  @ViewChild('backupsTableTag', { static: true }) backupsTable: NzTableComponent<Backup> | undefined;
  @Input() set backups(backups: Backup[] | null) {
    if (backups) {
      this._backups = backups;
    }
  }
  @Output() editBackup: EventEmitter<number> = new EventEmitter<number>();

  _backups: Backup[] = [];
  expandSet = new Set<number>();
  play = faPlay;
  edit = faEdit;
  archive = faArchive;

  readonly backupStore = inject(BackupsSignalStore);

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  runBackup(backup: Backup): void {
    this.backupStore.runBackup({ backupId: backup.id });
  }
}

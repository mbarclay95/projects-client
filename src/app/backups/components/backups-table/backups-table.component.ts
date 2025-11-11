import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import {
  NzTableComponent,
  NzTheadComponent,
  NzTrDirective,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTbodyComponent,
  NzTdAddOnComponent,
  NzTrExpandDirective,
  NzTableFixedRowComponent,
} from 'ng-zorro-antd/table';
import { Backup } from '../../models/backup.model';
import { faArchive, faEdit, faPlay } from '@fortawesome/free-solid-svg-icons';
import { BackupsSignalStore } from '../../services/backups-signal-store';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { StatusIconComponent } from '../status-icon/status-icon.component';
import { NzCollapseComponent, NzCollapsePanelComponent } from 'ng-zorro-antd/collapse';
import { DatePipe } from '@angular/common';
import { SortGenericPipe } from '../../../shared/pipes/sort-generic.pipe';
import { BackupStatusPipe } from '../../pipes/backup-status.pipe';
import { BackupRunTimePipe } from '../../pipes/backup-run-time.pipe';

@Component({
  selector: 'app-backups-table',
  templateUrl: './backups-table.component.html',
  styleUrls: ['./backups-table.component.scss'],
  imports: [
    NzTableComponent,
    NzTheadComponent,
    NzTrDirective,
    NzTableCellDirective,
    NzThMeasureDirective,
    NzTbodyComponent,
    NzTdAddOnComponent,
    NzButtonComponent,
    NzPopconfirmDirective,
    FaIconComponent,
    StatusIconComponent,
    NzTrExpandDirective,
    NzTableFixedRowComponent,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    DatePipe,
    SortGenericPipe,
    BackupStatusPipe,
    BackupRunTimePipe,
  ],
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

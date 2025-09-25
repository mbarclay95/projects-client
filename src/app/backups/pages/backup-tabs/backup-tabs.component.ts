import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BackupsSignalStore } from '../../services/backups-signal-store';
import { TargetSignalStore } from '../../services/target-signal-store';

@Component({
  selector: 'app-backup-tabs',
  templateUrl: './backup-tabs.component.html',
  styleUrls: ['./backup-tabs.component.scss'],
  standalone: false,
})
export class BackupTabsComponent implements OnInit, OnDestroy {
  selectedTab: 'Backup Job' | 'Target' = 'Backup Job';

  readonly backupStore = inject(BackupsSignalStore);
  readonly targetStore = inject(TargetSignalStore);

  ngOnInit(): void {
    this.backupStore.startPolling();
  }

  ngOnDestroy(): void {
    this.backupStore.stopPolling();
  }

  selectBackupTab() {
    this.selectedTab = 'Backup Job';
    this.backupStore.startPolling();
  }

  createEntity(): void {
    switch (this.selectedTab) {
      case 'Backup Job':
        this.backupStore.createEntity();
        break;
      // case "Scheduled Backup Job":
      //   this.openScheduledBackupsDrawer.next(createScheduledBackup({id: 0}));
      //   break;
      case 'Target':
        this.targetStore.createEntity();
        break;
    }
  }
}

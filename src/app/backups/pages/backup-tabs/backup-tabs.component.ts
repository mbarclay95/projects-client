import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Backup, createBackup} from "../../models/backup.model";
import {BackupsPollingService} from "../../services/backups-polling.service";
import {createTarget, Target} from "../../models/target.model";
import {Schedule} from '../../models/scheduled.model';

@Component({
  selector: 'app-backup-tabs',
  templateUrl: './backup-tabs.component.html',
  styleUrls: ['./backup-tabs.component.scss']
})
export class BackupTabsComponent implements OnInit, OnDestroy {
  selectedTab: 'Backup Job' | 'Target' = 'Backup Job';
  openBackupsDrawer: Subject<Backup> = new Subject<Backup>();
  openScheduledBackupsDrawer: Subject<Schedule> = new Subject<Schedule>();
  openTargetModal: Subject<{target: Target}> = new Subject<{target: Target}>();

  constructor(
    public backupsPollingService: BackupsPollingService
  ) { }

  ngOnInit(): void {
    this.backupsPollingService.startPolling();
  }

  ngOnDestroy(): void {
    this.backupsPollingService.stopPolling();
  }

  selectBackupTab() {
    this.selectedTab = 'Backup Job';
    this.backupsPollingService.startPolling();
  }

  createEntity(): void {
    switch (this.selectedTab) {
      case "Backup Job":
        this.openBackupsDrawer.next(createBackup({id: 0}));
        break;
      // case "Scheduled Backup Job":
      //   this.openScheduledBackupsDrawer.next(createScheduledBackup({id: 0}));
      //   break;
      case "Target":
        this.openTargetModal.next({target: createTarget({id: 0})});
        break;
    }
  }
}

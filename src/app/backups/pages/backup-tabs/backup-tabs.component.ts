import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {Backup, createBackup} from "../../models/backup.model";
import {BackupsPollingService} from "../../services/backups-polling.service";
import {createTarget, Target} from "../../models/target.model";

@Component({
  selector: 'app-backup-tabs',
  templateUrl: './backup-tabs.component.html',
  styleUrls: ['./backup-tabs.component.scss']
})
export class BackupTabsComponent implements OnInit {
  selectedTab: 'Backup Job' | 'Scheduled Backup Job' | 'Target' = 'Backup Job';
  openBackupsDrawer: Subject<Backup> = new Subject<Backup>();
  openScheduledBackupsDrawer: Subject<Backup> = new Subject<Backup>();
  openTargetModal: Subject<{target: Target}> = new Subject<{target: Target}>();

  constructor(
    public backupsPollingService: BackupsPollingService
  ) { }

  ngOnInit(): void {
    this.backupsPollingService.startPolling();
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
      case "Scheduled Backup Job":
        break;
      case "Target":
        this.openTargetModal.next({target: createTarget({id: 0})});
        break;
    }
  }
}

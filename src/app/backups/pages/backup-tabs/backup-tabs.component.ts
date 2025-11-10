import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BackupsSignalStore } from '../../services/backups-signal-store';
import { TargetSignalStore } from '../../services/target-signal-store';
import { NzTabsComponent, NzTabComponent, NzTabLinkTemplateDirective, NzTabLinkDirective } from 'ng-zorro-antd/tabs';
import { RouterLink } from '@angular/router';
import { BackupsPageComponent } from '../backups-page/backups-page.component';
import { TargetsPageComponent } from '../targets-page/targets-page.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { CreateEditBackupsDrawerComponent } from '../../components/create-edit-backups-drawer/create-edit-backups-drawer.component';
import { CreateEditTargetModalComponent } from '../../components/create-edit-target-modal/create-edit-target-modal.component';

@Component({
  selector: 'app-backup-tabs',
  templateUrl: './backup-tabs.component.html',
  styleUrls: ['./backup-tabs.component.scss'],
  imports: [
    NzTabsComponent,
    NzTabComponent,
    NzTabLinkTemplateDirective,
    NzTabLinkDirective,
    RouterLink,
    BackupsPageComponent,
    TargetsPageComponent,
    NzButtonComponent,
    CreateEditBackupsDrawerComponent,
    CreateEditTargetModalComponent,
  ],
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

import { Component, inject, Input } from '@angular/core';
import { faCircleExclamation, faPlus } from '@fortawesome/free-solid-svg-icons';
import { HeartbeatStatus } from '../../models/heartbeat-item.model';
import { isMobile } from '../../../app.component';
import { MonitorItem } from '../../models/monitor-item.model';
import { FolderSignalStore } from '../../services/folder-signal-store';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';
import { FolderComponent } from '../folder/folder.component';
import { CreateEditFolderModalComponent } from '../create-edit-folder-modal/create-edit-folder-modal.component';
import { CreateEditSiteModalComponent } from '../create-edit-site-modal/create-edit-site-modal.component';

@Component({
  selector: 'app-folder-grid',
  templateUrl: './folder-grid.component.html',
  styleUrls: ['./folder-grid.component.scss'],
  imports: [NzButtonComponent, FaIconComponent, NgClass, FolderComponent, CreateEditFolderModalComponent, CreateEditSiteModalComponent],
})
export class FolderGridComponent {
  @Input() showUptimeKuma = false;
  @Input() uptimeKumaIsConnected = false;
  @Input() downItems: MonitorItem[] = [];

  isMobile = isMobile;
  add = faPlus;
  down = faCircleExclamation;
  siteDown = HeartbeatStatus.down;
  sitePending = HeartbeatStatus.pending;

  readonly folderStore = inject(FolderSignalStore);

  createFolder(): void {
    this.folderStore.createEntity();
  }
}

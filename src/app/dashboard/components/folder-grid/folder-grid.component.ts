import { Component, inject, Input } from '@angular/core';
import { faCircleExclamation, faPlus } from '@fortawesome/free-solid-svg-icons';
import { HeartbeatStatus } from '../../models/heartbeat-item.model';
import { isMobile } from '../../../app.component';
import { MonitorItem } from '../../models/monitor-item.model';
import { FolderSignalStore } from '../../services/folder-signal-store';

@Component({
  selector: 'app-folder-grid',
  templateUrl: './folder-grid.component.html',
  styleUrls: ['./folder-grid.component.scss'],
  standalone: false,
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
    this.folderStore.setSelectedFolder(0);
  }
}

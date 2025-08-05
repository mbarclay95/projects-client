import { Component, Input, OnInit } from '@angular/core';
import { faCircleExclamation, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { createFolder, Folder } from '../../models/folder.model';
import { Site } from '../../models/site.model';
import { FoldersQuery } from '../../services/folder/state/folders.query';
import { HeartbeatStatus } from '../../models/heartbeat-item.model';
import { isMobile } from '../../../app.component';
import { MonitorItem } from '../../models/monitor-item.model';

@Component({
  selector: 'app-folder-grid',
  templateUrl: './folder-grid.component.html',
  styleUrls: ['./folder-grid.component.scss'],
  standalone: false,
})
export class FolderGridComponent implements OnInit {
  @Input() showUptimeKuma = false;
  @Input() uptimeKumaIsConnected = false;
  @Input() downItems: MonitorItem[] = [];
  isMobile = isMobile;
  add = faPlus;
  openFolderModal: Subject<Folder> = new Subject<Folder>();
  openSiteModal: Subject<Site> = new Subject<Site>();

  down = faCircleExclamation;
  siteDown = HeartbeatStatus.down;
  sitePending = HeartbeatStatus.pending;

  constructor(public foldersQuery: FoldersQuery) {}

  ngOnInit(): void {}

  createFolder(): void {
    const folder = createFolder({ id: 0 });
    this.openFolderModal.next(folder);
  }
}

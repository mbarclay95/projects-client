import { Component, OnInit } from '@angular/core';
import {faCircleExclamation, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Subject} from "rxjs";
import {createFolder, Folder} from "../../models/folder.model";
import {Site} from "../../models/site.model";
import {FoldersQuery} from "../../services/folder/state/folders.query";
import {FoldersService} from "../../services/folder/state/folders.service";
import {UptimeKumaService} from '../../services/uptime-kuma.service';
import {HeartbeatStatus} from '../../models/heartbeat-item.model';

@Component({
  selector: 'app-folder-grid',
  templateUrl: './folder-grid.component.html',
  styleUrls: ['./folder-grid.component.scss']
})
export class FolderGridComponent implements OnInit {
  isMobile = screen.width < 600;
  add = faPlus;
  openFolderModal: Subject<Folder> = new Subject<Folder>();
  openSiteModal: Subject<Site> = new Subject<Site>();

  down = faCircleExclamation;
  siteDown = HeartbeatStatus.down;
  sitePending = HeartbeatStatus.pending;

  constructor(
    public foldersQuery: FoldersQuery,
    public foldersService: FoldersService,
    public uptimeKumaService: UptimeKumaService
  ) { }

  ngOnInit(): void {
  }

  createFolder(): void {
    const folder = createFolder({id: -1});
    this.openFolderModal.next(folder);
  }

}

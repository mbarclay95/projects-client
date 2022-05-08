import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {Backup, createBackup} from "../../models/backup.model";

@Component({
  selector: 'app-backup-tabs',
  templateUrl: './backup-tabs.component.html',
  styleUrls: ['./backup-tabs.component.scss']
})
export class BackupTabsComponent implements OnInit {
  selectedTab: 'Backup Job' | 'Scheduled Backup Job' = 'Backup Job';
  openBackupsDrawer: Subject<Backup> = new Subject<Backup>();

  constructor() { }

  ngOnInit(): void {
  }

  createJob(): void {
    switch (this.selectedTab) {
      case "Backup Job":
        this.openBackupsDrawer.next(createBackup({id: 0}));
        break;
      case "Scheduled Backup Job":
        break;
    }
  }
}

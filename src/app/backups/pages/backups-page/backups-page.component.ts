import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BackupsQuery } from '../../services/backups/state/backups.query';
import { Backup } from '../../models/backup.model';

@Component({
  selector: 'app-backups-page',
  templateUrl: './backups-page.component.html',
  styleUrls: ['./backups-page.component.scss'],
})
export class BackupsPageComponent implements OnInit {
  @Output() editBackup: EventEmitter<Backup> = new EventEmitter<Backup>();

  constructor(public backupsQuery: BackupsQuery) {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { ScheduledBackupsQuery } from '../../services/scheduled-backups/state/scheduled-backups.query';

@Component({
  selector: 'app-scheduled-backups-page',
  templateUrl: './scheduled-backups-page.component.html',
  styleUrls: ['./scheduled-backups-page.component.scss'],
})
export class ScheduledBackupsPageComponent implements OnInit {
  constructor(public scheduledBackupsQuery: ScheduledBackupsQuery) {}

  ngOnInit(): void {}
}

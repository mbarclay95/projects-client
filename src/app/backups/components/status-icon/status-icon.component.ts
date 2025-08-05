import { Component, Input, OnInit } from '@angular/core';
import { BackupStatus } from '../../models/backup.model';
import { faCheckCircle, faCircleXmark, faExclamationCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss'],
  standalone: false,
})
export class StatusIconComponent implements OnInit {
  @Input() status!: BackupStatus;
  @Input() iconSize: SizeProp = '1x';

  completed = faCheckCircle;
  inProgress = faSpinner;
  // queued = faPauseCircle;
  queued = faCircleXmark;
  error = faExclamationCircle;

  constructor() {}

  ngOnInit(): void {}
}

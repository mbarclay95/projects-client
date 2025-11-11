import { Component, Input } from '@angular/core';
import { BackupStatus } from '../../models/backup.model';
import { faCheckCircle, faCircleXmark, faExclamationCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss'],
  imports: [FaIconComponent],
})
export class StatusIconComponent {
  @Input() status!: BackupStatus;
  @Input() iconSize: SizeProp = '1x';

  completed = faCheckCircle;
  inProgress = faSpinner;
  // queued = faPauseCircle;
  queued = faCircleXmark;
  error = faExclamationCircle;
}

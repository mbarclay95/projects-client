import { Component, inject } from '@angular/core';
import { SchedulesSignalStore } from '../../services/schedules-signal-store';

@Component({
  selector: 'app-scheduled-backups-page',
  templateUrl: './scheduled-backups-page.component.html',
  styleUrls: ['./scheduled-backups-page.component.scss'],
  standalone: false,
})
export class ScheduledBackupsPageComponent {
  readonly schedulesStore = inject(SchedulesSignalStore);
}

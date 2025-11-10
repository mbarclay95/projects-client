import { Component, inject } from '@angular/core';
import { SchedulesSignalStore } from '../../services/schedules-signal-store';
import { ScheduledBackupsTableComponent } from '../../components/scheduled-backups-table/scheduled-backups-table.component';

@Component({
  selector: 'app-scheduled-backups-page',
  templateUrl: './scheduled-backups-page.component.html',
  styleUrls: ['./scheduled-backups-page.component.scss'],
  imports: [ScheduledBackupsTableComponent],
})
export class ScheduledBackupsPageComponent {
  readonly schedulesStore = inject(SchedulesSignalStore);
}

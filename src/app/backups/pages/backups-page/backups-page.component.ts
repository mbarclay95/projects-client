import { Component, EventEmitter, inject, Output } from '@angular/core';
import { BackupsSignalStore } from '../../services/backups-signal-store';
import { BackupsTableComponent } from '../../components/backups-table/backups-table.component';

@Component({
  selector: 'app-backups-page',
  templateUrl: './backups-page.component.html',
  styleUrls: ['./backups-page.component.scss'],
  imports: [BackupsTableComponent],
})
export class BackupsPageComponent {
  @Output() editBackup: EventEmitter<number> = new EventEmitter<number>();
  readonly backupStore = inject(BackupsSignalStore);
}

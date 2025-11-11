import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TargetSignalStore } from '../../services/target-signal-store';
import { TargetsTableComponent } from '../../components/targets-table/targets-table.component';

@Component({
  selector: 'app-targets-page',
  templateUrl: './targets-page.component.html',
  styleUrls: ['./targets-page.component.scss'],
  imports: [TargetsTableComponent],
})
export class TargetsPageComponent {
  @Output() editTarget: EventEmitter<number> = new EventEmitter<number>();
  readonly targetStore = inject(TargetSignalStore);
}

import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TargetSignalStore } from '../../services/target-signal-store';

@Component({
  selector: 'app-targets-page',
  templateUrl: './targets-page.component.html',
  styleUrls: ['./targets-page.component.scss'],
  standalone: false,
})
export class TargetsPageComponent {
  @Output() editTarget: EventEmitter<number> = new EventEmitter<number>();
  readonly targetStore = inject(TargetSignalStore);
}

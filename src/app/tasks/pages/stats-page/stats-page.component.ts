import { Component, inject } from '@angular/core';
import { FamilyStatsSignalStore } from '../../services/family-stats-signal-store';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss'],
  standalone: false,
})
export class StatsPageComponent {
  readonly familyStatsStore = inject(FamilyStatsSignalStore);
}

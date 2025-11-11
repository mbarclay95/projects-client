import { Component, inject } from '@angular/core';
import { FamilyStatsSignalStore } from '../../services/family-stats-signal-store';
import { YearSelectorComponent } from '../../components/year-selector/year-selector.component';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { FamilyMemberStatsComponent } from '../../components/family-member-stats/family-member-stats.component';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss'],
  imports: [YearSelectorComponent, NzSpinComponent, FamilyMemberStatsComponent],
})
export class StatsPageComponent {
  readonly familyStatsStore = inject(FamilyStatsSignalStore);
}

import { Component, inject } from '@angular/core';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FamilyStatsSignalStore } from '../../services/family-stats-signal-store';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss'],
  standalone: false,
})
export class YearSelectorComponent {
  left = faCaretLeft;
  right = faCaretRight;

  readonly familyStatsStore = inject(FamilyStatsSignalStore);
}

import { Component, inject } from '@angular/core';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FamilyStatsSignalStore } from '../../services/family-stats-signal-store';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss'],
  imports: [NzButtonComponent, FaIconComponent],
})
export class YearSelectorComponent {
  left = faCaretLeft;
  right = faCaretRight;

  readonly familyStatsStore = inject(FamilyStatsSignalStore);
}

import { Component, Input } from '@angular/core';
import { FamilyMemberStats } from '../../models/family-member-stats.model';
import { isMobile } from '../../../app.component';
import { NzDividerComponent } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-family-member-stats',
  templateUrl: './family-member-stats.component.html',
  styleUrls: ['./family-member-stats.component.scss'],
  imports: [NzDividerComponent],
})
export class FamilyMemberStatsComponent {
  @Input() stats!: FamilyMemberStats;

  isMobile = isMobile;
}

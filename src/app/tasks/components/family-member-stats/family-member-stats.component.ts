import { Component, Input, OnInit } from '@angular/core';
import { FamilyMemberStats } from '../../models/family-member-stats.model';
import { isMobile } from '../../../app.component';

@Component({
  selector: 'app-family-member-stats',
  templateUrl: './family-member-stats.component.html',
  styleUrls: ['./family-member-stats.component.scss'],
})
export class FamilyMemberStatsComponent implements OnInit {
  @Input() stats!: FamilyMemberStats;

  isMobile = isMobile;

  constructor() {}

  ngOnInit(): void {}
}

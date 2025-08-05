import { Component, OnInit } from '@angular/core';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FamilyStatsService } from '../../services/family-stats.service';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss'],
})
export class YearSelectorComponent implements OnInit {
  left = faCaretLeft;
  right = faCaretRight;

  constructor(public familyStatsService: FamilyStatsService) {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { GoalsQuery } from '../../services/state/goals.query';
import { GoalsService } from '../../services/state/goals.service';

@Component({
  selector: 'app-week-selector',
  templateUrl: './week-selector.component.html',
  styleUrls: ['./week-selector.component.scss'],
})
export class WeekSelectorComponent implements OnInit {
  left = faCaretLeft;
  right = faCaretRight;

  constructor(
    public goalsQuery: GoalsQuery,
    public goalsService: GoalsService,
  ) {}

  ngOnInit(): void {}
}

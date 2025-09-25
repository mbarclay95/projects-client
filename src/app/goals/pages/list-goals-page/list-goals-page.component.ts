import { Component, inject, OnInit } from '@angular/core';
import { isMobile } from '../../../app.component';
import { GoalsSignalStore } from '../../services/goals-signal-store';

@Component({
  selector: 'app-list-goals-page',
  templateUrl: './list-goals-page.component.html',
  styleUrls: ['./list-goals-page.component.scss'],
  standalone: false,
})
export class ListGoalsPageComponent implements OnInit {
  isMobile = isMobile;
  readonly goalsStore = inject(GoalsSignalStore);

  ngOnInit(): void {
    this.goalsStore.updateUiState({ weekOffset: 0 });
  }

  createNewGoal() {
    this.goalsStore.createEntity({ equality: 'atLeast', lengthOfTime: 'week' });
  }
}

import { Component, effect, inject } from '@angular/core';
import { GoalsSignalStore } from '../services/goals-signal-store';

@Component({
  selector: 'app-goals-layout',
  templateUrl: './goals-layout.component.html',
  styleUrls: ['./goals-layout.component.scss'],
  standalone: false,
})
export class GoalsLayoutComponent {
  readonly goalsStore = inject(GoalsSignalStore);

  constructor() {
    effect(() => {
      this.goalsStore.setQueryString(this.goalsStore.buildQueryString());
      this.goalsStore.loadAll({});
    });
  }
}

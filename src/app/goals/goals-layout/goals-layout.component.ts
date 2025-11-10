import { Component, effect, inject } from '@angular/core';
import { GoalsSignalStore } from '../services/goals-signal-store';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-goals-layout',
  templateUrl: './goals-layout.component.html',
  styleUrls: ['./goals-layout.component.scss'],
  imports: [NzContentComponent, RouterOutlet],
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

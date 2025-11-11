import { Component, inject, OnInit } from '@angular/core';
import { isMobile } from '../../../app.component';
import { GoalsSignalStore } from '../../services/goals-signal-store';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { WeekSelectorComponent } from '../../components/week-selector/week-selector.component';
import { GoalsTableMobileComponent } from '../../components/goals-table-mobile/goals-table-mobile.component';
import { GoalsTableComponent } from '../../components/goals-table/goals-table.component';
import { CreateEditGoalModalComponent } from '../../components/create-edit-goal-modal/create-edit-goal-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list-goals-page',
  templateUrl: './list-goals-page.component.html',
  styleUrls: ['./list-goals-page.component.scss'],
  imports: [
    PageHeaderComponent,
    NzSpinComponent,
    WeekSelectorComponent,
    GoalsTableMobileComponent,
    GoalsTableComponent,
    CreateEditGoalModalComponent,
    NzModalModule,
  ],
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

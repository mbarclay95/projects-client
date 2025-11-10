import { Component, inject } from '@angular/core';
import { faPeopleRoof, faUser } from '@fortawesome/free-solid-svg-icons';
import { TasksSignalStore } from '../../services/tasks-signal-store';
import { NzSegmentedComponent, NzSegmentedItemComponent } from 'ng-zorro-antd/segmented';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-weekly-tasks-segment',
  templateUrl: './weekly-tasks-segment.component.html',
  styleUrls: ['./weekly-tasks-segment.component.scss'],
  imports: [NzSegmentedComponent, ReactiveFormsModule, FormsModule, NzSegmentedItemComponent, FaIconComponent],
})
export class WeeklyTasksSegmentComponent {
  family = faPeopleRoof;
  personal = faUser;

  readonly tasksStore = inject(TasksSignalStore);

  changePage(page: number) {
    this.tasksStore.updateUiState({ ownerType: page === 0 ? 'family' : 'user' }, false);
  }
}

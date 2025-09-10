import { Component, inject } from '@angular/core';
import { faPeopleRoof, faUser } from '@fortawesome/free-solid-svg-icons';
import { TasksSignalStore } from '../../services/tasks-signal-store';

@Component({
  selector: 'app-weekly-tasks-segment',
  templateUrl: './weekly-tasks-segment.component.html',
  styleUrls: ['./weekly-tasks-segment.component.scss'],
  standalone: false,
})
export class WeeklyTasksSegmentComponent {
  family = faPeopleRoof;
  personal = faUser;

  readonly tasksStore = inject(TasksSignalStore);

  changePage(page: number) {
    this.tasksStore.updateUiState({ ownerType: page === 0 ? 'family' : 'user' }, false);
  }
}

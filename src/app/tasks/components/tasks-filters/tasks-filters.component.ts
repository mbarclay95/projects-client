import { Component, inject, Input } from '@angular/core';
import { TasksSignalStore, TasksUiState } from '../../services/tasks-signal-store';
import { TagsSignalStore } from '../../services/tags-signal-store';

@Component({
  selector: 'app-tasks-filters',
  templateUrl: './tasks-filters.component.html',
  styleUrls: ['./tasks-filters.component.scss'],
  standalone: false,
})
export class TasksFiltersComponent {
  @Input() ui!: TasksUiState;

  readonly tasksStore = inject(TasksSignalStore);
  readonly tagsStore = inject(TagsSignalStore);
}

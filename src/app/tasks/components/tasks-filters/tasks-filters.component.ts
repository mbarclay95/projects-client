import { Component, inject, Input } from '@angular/core';
import { TasksSignalStore, TasksUiState } from '../../services/tasks-signal-store';
import { TagsSignalStore } from '../../services/tags-signal-store';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-tasks-filters',
  templateUrl: './tasks-filters.component.html',
  styleUrls: ['./tasks-filters.component.scss'],
  imports: [NzInputDirective, ReactiveFormsModule, FormsModule, NzSelectComponent, NzOptionComponent],
})
export class TasksFiltersComponent {
  @Input() ui!: TasksUiState;

  readonly tasksStore = inject(TasksSignalStore);
  readonly tagsStore = inject(TagsSignalStore);
}

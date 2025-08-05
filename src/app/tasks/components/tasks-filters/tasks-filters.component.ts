import { Component, Input, OnInit } from '@angular/core';
import { TaskUiState } from '../../services/tasks/state/tasks.store';
import { TasksService } from '../../services/tasks/state/tasks.service';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'app-tasks-filters',
  templateUrl: './tasks-filters.component.html',
  styleUrls: ['./tasks-filters.component.scss'],
  standalone: false,
})
export class TasksFiltersComponent implements OnInit {
  @Input() ui!: TaskUiState;

  constructor(
    public tasksService: TasksService,
    public tagsService: TagsService,
  ) {}

  ngOnInit(): void {}
}

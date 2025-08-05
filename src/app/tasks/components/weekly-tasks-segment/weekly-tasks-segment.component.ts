import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TasksQuery } from '../../services/tasks/state/tasks.query';
import { TasksService } from '../../services/tasks/state/tasks.service';
import { NzSegmentedOption, NzSegmentedOptions } from 'ng-zorro-antd/segmented';
import { faPeopleRoof, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weekly-tasks-segment',
  templateUrl: './weekly-tasks-segment.component.html',
  styleUrls: ['./weekly-tasks-segment.component.scss'],
  standalone: false,
})
export class WeeklyTasksSegmentComponent implements OnInit {
  @ViewChild('customSegment', { static: true, read: TemplateRef }) templateRef!: TemplateRef<{
    $implicit: NzSegmentedOption;
    index: number;
  }>;
  family = faPeopleRoof;
  personal = faUser;

  constructor(
    public tasksQuery: TasksQuery,
    private tasksService: TasksService,
  ) {}

  ngOnInit(): void {}

  changePage(page: number) {
    this.tasksService.updateUi({ ownerType: page === 0 ? 'family' : 'user' }, false);
  }
}

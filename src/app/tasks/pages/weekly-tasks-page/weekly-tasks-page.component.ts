import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MobileDisplayService } from '../../../shared/services/mobile-display.service';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createTask, Task } from '../../models/task.model';
import { isMobile } from '../../../app.component';
import { FamiliesSignalStore } from '../../services/families-signal-store';
import { TaskUserConfigsSignalStore } from '../../services/task-user-configs-signal-store';
import { TasksSignalStore } from '../../services/tasks-signal-store';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { WeeklyTasksSegmentComponent } from '../../components/weekly-tasks-segment/weekly-tasks-segment.component';
import { WeeklyProgressComponent } from '../../components/weekly-progress/weekly-progress.component';
import { TasksListComponent } from '../../components/tasks-list/tasks-list.component';
import { CreateEditTaskModalMobileComponent } from '../../components/create-edit-task-modal-mobile/create-edit-task-modal-mobile.component';
import { ViewTaskModalComponent } from '../../components/view-task-modal/view-task-modal.component';
import { SkipTaskModalComponent } from '../../components/skip-task-modal/skip-task-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-weekly-tasks-page',
  templateUrl: './weekly-tasks-page.component.html',
  styleUrls: ['./weekly-tasks-page.component.scss'],
  imports: [
    NzSpinComponent,
    WeeklyTasksSegmentComponent,
    WeeklyProgressComponent,
    TasksListComponent,
    CreateEditTaskModalMobileComponent,
    ViewTaskModalComponent,
    SkipTaskModalComponent,
    NzModalModule,
  ],
})
export class WeeklyTasksPageComponent implements OnInit {
  @Output() viewTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() skipTask: EventEmitter<Task> = new EventEmitter<Task>();
  isMobile = isMobile;

  createEditTask: Observable<Task> = merge(
    this.mobileHeaderService.clickedButton$.pipe(
      map(() => createTask({ ownerId: this.familiesStore.activeFamilyId(), taskPoint: this.familiesStore.minTaskPoint() })),
    ),
  );

  readonly familiesStore = inject(FamiliesSignalStore);
  readonly taskUserConfigsStore = inject(TaskUserConfigsSignalStore);
  readonly tasksStore = inject(TasksSignalStore);

  constructor(private mobileHeaderService: MobileDisplayService) {}

  ngOnInit(): void {
    if (this.isMobile) {
      this.tasksStore.loadWeeklyPage();
      this.taskUserConfigsStore.resetWeekOffset();
    }
  }
}

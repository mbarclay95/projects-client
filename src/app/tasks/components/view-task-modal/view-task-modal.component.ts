import {Component} from '@angular/core';
import {Task} from '../../models/task.model';
import {DefaultModalComponent} from '../../../shared/components/default-modal/default-modal.component';
import {FamiliesQuery} from '../../services/families/state/families.query';
import {faChevronDown, faChevronUp, faFlag, faPeopleRoof, faUser} from '@fortawesome/free-solid-svg-icons';
import {TasksService} from '../../services/tasks/state/tasks.service';
import {TasksQuery} from '../../services/tasks/state/tasks.query';

@Component({
  selector: 'app-view-task-modal',
  templateUrl: './view-task-modal.component.html',
  styleUrls: ['./view-task-modal.component.scss']
})
export class ViewTaskModalComponent extends DefaultModalComponent<Task> {

  showHistory = false;
  loadingHistory = false;
  flag = faFlag;
  household = faPeopleRoof;
  personal = faUser;
  arrowDown = faChevronDown;
  arrowUp = faChevronUp;

  constructor(
    public familiesQuery: FamiliesQuery,
    private tasksService: TasksService,
    private tasksQuery: TasksQuery
  ) {
    super();
  }

  override onOpenModal() {
    this.showHistory = false;
    void this.loadTaskHistory();
    super.onOpenModal();
  }

  async loadTaskHistory(): Promise<void> {
    if (this.model && this.model.taskHistory === undefined) {
      this.loadingHistory = true;
      await this.tasksService.loadTaskHistoryIfNeeded(this.model);
      this.model = this.tasksQuery.getEntity(this.model.id);
      this.loadingHistory = false;
    }
  }
}

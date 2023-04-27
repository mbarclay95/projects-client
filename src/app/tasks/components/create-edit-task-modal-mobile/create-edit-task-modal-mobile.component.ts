import {Component} from '@angular/core';
import {AuthQuery} from '../../../auth/services/state/auth.query';
import {TagsService} from '../../services/tags.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TasksService} from '../../services/tasks/state/tasks.service';
import {FamiliesQuery} from '../../services/families/state/families.query';
import {CreateEditTaskModalComponent} from '../create-edit-task-modal/create-edit-task-modal.component';
import {faChevronDown, faChevronUp, faFlag, faPause} from '@fortawesome/free-solid-svg-icons';
import {takeUntil} from 'rxjs';
import {isMobile} from '../../../app.component';

@Component({
  selector: 'app-create-edit-task-modal-mobile',
  templateUrl: './create-edit-task-modal-mobile.component.html',
  styleUrls: ['./create-edit-task-modal-mobile.component.scss']
})
export class CreateEditTaskModalMobileComponent extends CreateEditTaskModalComponent {
  recurringExpanded = false;
  advancedExpanded = false;
  modalStyle = isMobile ? {top: '20px'} : {};
  modalWidth = isMobile ? '95%' : '500px';

  pause = faPause;
  flag = faFlag;
  arrowDown = faChevronDown;
  arrowUp = faChevronUp;

  constructor(
    tasksService: TasksService,
    nzMessageService: NzMessageService,
    authQuery: AuthQuery,
    familiesQuery: FamiliesQuery,
    tagsService: TagsService
  ) {
    super(tasksService, nzMessageService, authQuery, familiesQuery, tagsService);
  }

  override ngOnInit() {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(task => {
      this.recurringExpanded = task.id !== 0;
      this.advancedExpanded = false;
    });
    super.ngOnInit();
  }
}

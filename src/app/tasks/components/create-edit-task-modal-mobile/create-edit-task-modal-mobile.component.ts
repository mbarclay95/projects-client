import {Component} from '@angular/core';
import {AuthQuery} from '../../../auth/services/state/auth.query';
import {TagsService} from '../../services/tags.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TasksService} from '../../services/tasks/state/tasks.service';
import {FamiliesQuery} from '../../services/families/state/families.query';
import {CreateEditTaskModalComponent} from '../create-edit-task-modal/create-edit-task-modal.component';
import {fa0, fa1, fa2, fa3, faChevronDown, faChevronUp, faFlag, faPause} from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from '@fortawesome/free-brands-svg-icons';
import {takeUntil} from 'rxjs';

@Component({
  selector: 'app-create-edit-task-modal-mobile',
  templateUrl: './create-edit-task-modal-mobile.component.html',
  styleUrls: ['./create-edit-task-modal-mobile.component.scss']
})
export class CreateEditTaskModalMobileComponent extends CreateEditTaskModalComponent {
  recurringExpanded = false;
  advancedExpanded = false;

  pause = faPause;
  flag = faFlag;
  zeroPoints = fa0;
  onePoint = fa1;
  twoPoints = fa2;
  threePoints = fa3;
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
    ).subscribe(() => {
      this.recurringExpanded = false;
      this.advancedExpanded = false;
    });
    super.ngOnInit();
  }

  getIcon(points?: number): IconDefinition {
    switch (points) {
      case 0: return this.zeroPoints;
      case 1: return this.onePoint;
      case 2: return this.twoPoints;
      default: return this.threePoints;
    }
  }

}

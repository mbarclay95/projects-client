import { Component } from '@angular/core';
import { CreateEditTaskModalComponent } from '../create-edit-task-modal/create-edit-task-modal.component';
import { faChevronDown, faChevronUp, faFlag, faPause } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-edit-task-modal-mobile',
  templateUrl: './create-edit-task-modal-mobile.component.html',
  styleUrls: ['./create-edit-task-modal-mobile.component.scss'],
  standalone: false,
})
export class CreateEditTaskModalMobileComponent extends CreateEditTaskModalComponent {
  recurringExpanded = false;
  advancedExpanded = false;

  pause = faPause;
  flag = faFlag;
  arrowDown = faChevronDown;
  arrowUp = faChevronUp;

  override onOpenModal() {
    super.onOpenModal();
    this.recurringExpanded = this.model?.id !== 0;
    this.advancedExpanded = false;
  }
}

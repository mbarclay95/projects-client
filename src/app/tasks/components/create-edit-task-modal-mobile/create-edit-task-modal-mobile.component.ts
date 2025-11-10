import { Component } from '@angular/core';
import { CreateEditTaskModalComponent } from '../create-edit-task-modal/create-edit-task-modal.component';
import { faChevronDown, faChevronUp, faFlag, faPause } from '@fortawesome/free-solid-svg-icons';
import { NzModalComponent, NzModalContentDirective } from 'ng-zorro-antd/modal';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzRadioGroupComponent, NzRadioComponent } from 'ng-zorro-antd/radio';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { PluralFrequencyPipe } from '../../pipes/plural-frequency.pipe';
import { SelectedTaskPointColorPipe } from '../../pipes/selected-task-point-color.pipe';

@Component({
  selector: 'app-create-edit-task-modal-mobile',
  templateUrl: './create-edit-task-modal-mobile.component.html',
  styleUrls: ['./create-edit-task-modal-mobile.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    FaIconComponent,
    NgClass,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    NzRadioGroupComponent,
    NzRadioComponent,
    NzSwitchComponent,
    NzInputNumberComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzDatePickerComponent,
    PluralFrequencyPipe,
    SelectedTaskPointColorPipe,
  ],
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

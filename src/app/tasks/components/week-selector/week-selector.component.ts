import { Component, inject } from '@angular/core';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { TaskUserConfigsSignalStore } from '../../services/task-user-configs-signal-store';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-week-selector',
  templateUrl: './week-selector.component.html',
  styleUrls: ['./week-selector.component.scss'],
  imports: [NzButtonComponent, FaIconComponent],
})
export class WeekSelectorComponent {
  left = faCaretLeft;
  right = faCaretRight;

  readonly taskUserConfigsStore = inject(TaskUserConfigsSignalStore);
}

import { Component, inject } from '@angular/core';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { TaskUserConfigsSignalStore } from '../../services/task-user-configs-signal-store';

@Component({
  selector: 'app-week-selector',
  templateUrl: './week-selector.component.html',
  styleUrls: ['./week-selector.component.scss'],
  standalone: false,
})
export class WeekSelectorComponent {
  left = faCaretLeft;
  right = faCaretRight;

  readonly taskUserConfigsStore = inject(TaskUserConfigsSignalStore);
}

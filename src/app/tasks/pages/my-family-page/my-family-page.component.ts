import { Component, inject } from '@angular/core';
import { TaskUserConfigsSignalStore } from '../../services/task-user-configs-signal-store';
import { FamiliesSignalStore } from '../../services/families-signal-store';

@Component({
  selector: 'app-my-family-page',
  templateUrl: './my-family-page.component.html',
  styleUrls: ['./my-family-page.component.scss'],
  standalone: false,
})
export class MyFamilyPageComponent {
  readonly taskUserConfigsSignalStore = inject(TaskUserConfigsSignalStore);
  readonly familiesSignalStore = inject(FamiliesSignalStore);
}

import { Component, inject } from '@angular/core';
import { TaskUserConfigsSignalStore } from '../../services/task-user-configs-signal-store';
import { FamiliesSignalStore } from '../../services/families-signal-store';
import { WeekSelectorComponent } from '../../components/week-selector/week-selector.component';
import { MyFamilyEditFamilyComponent } from '../../components/my-family-edit-family/my-family-edit-family.component';
import { MyFamilyMembersComponent } from '../../components/my-family-members/my-family-members.component';

@Component({
  selector: 'app-my-family-page',
  templateUrl: './my-family-page.component.html',
  styleUrls: ['./my-family-page.component.scss'],
  imports: [WeekSelectorComponent, MyFamilyEditFamilyComponent, MyFamilyMembersComponent],
})
export class MyFamilyPageComponent {
  readonly taskUserConfigsSignalStore = inject(TaskUserConfigsSignalStore);
  readonly familiesSignalStore = inject(FamiliesSignalStore);
}

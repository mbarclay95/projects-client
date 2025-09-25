import { Component, inject, Input } from '@angular/core';
import { differenceInDays, endOfWeek } from 'date-fns';
import { TaskUserConfig } from '../../models/task-user-config.model';
import { FamiliesSignalStore } from '../../services/families-signal-store';

@Component({
  selector: 'app-weekly-progress',
  templateUrl: './weekly-progress.component.html',
  styleUrls: ['./weekly-progress.component.scss'],
  standalone: false,
})
export class WeeklyProgressComponent {
  @Input() userConfig?: TaskUserConfig | undefined;
  daysTillEndOfWeek = differenceInDays(endOfWeek(new Date(), { weekStartsOn: 1 }), new Date()) + 1;

  readonly familiesStore = inject(FamiliesSignalStore);
}

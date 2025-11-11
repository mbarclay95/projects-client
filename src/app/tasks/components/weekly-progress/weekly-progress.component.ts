import { Component, inject, Input } from '@angular/core';
import { differenceInDays, endOfWeek } from 'date-fns';
import { TaskUserConfig } from '../../models/task-user-config.model';
import { FamiliesSignalStore } from '../../services/families-signal-store';
import { NzProgressComponent } from 'ng-zorro-antd/progress';
import { WeeklyProgressPercentPipe } from '../../pipes/weekly-progress-percent.pipe';
import { TotalCompletedTasksPipe } from '../../pipes/total-completed-tasks.pipe';

@Component({
  selector: 'app-weekly-progress',
  templateUrl: './weekly-progress.component.html',
  styleUrls: ['./weekly-progress.component.scss'],
  imports: [NzProgressComponent, WeeklyProgressPercentPipe, TotalCompletedTasksPipe],
})
export class WeeklyProgressComponent {
  @Input() userConfig?: TaskUserConfig | undefined;
  daysTillEndOfWeek = differenceInDays(endOfWeek(new Date(), { weekStartsOn: 1 }), new Date()) + 1;

  readonly familiesStore = inject(FamiliesSignalStore);
}

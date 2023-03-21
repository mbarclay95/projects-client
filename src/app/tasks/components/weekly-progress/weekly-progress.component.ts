import {Component, Input, OnInit} from '@angular/core';
import {differenceInDays, endOfWeek} from "date-fns";
import {FamiliesQuery} from "../../services/families/state/families.query";
import {TaskUserConfig} from '../../models/task-user-config.model';

@Component({
  selector: 'app-weekly-progress',
  templateUrl: './weekly-progress.component.html',
  styleUrls: ['./weekly-progress.component.scss']
})
export class WeeklyProgressComponent implements OnInit {
  @Input() userConfig!: TaskUserConfig | undefined | null;
  daysTillEndOfWeek = differenceInDays(endOfWeek(new Date(), {weekStartsOn: 1}), new Date()) + 1;

  constructor(
    public familiesQuery: FamiliesQuery
  ) { }

  ngOnInit(): void {
  }

}

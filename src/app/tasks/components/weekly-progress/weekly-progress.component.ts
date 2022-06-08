import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../users/models/user.model";
import {differenceInDays, endOfWeek} from "date-fns";

@Component({
  selector: 'app-weekly-progress',
  templateUrl: './weekly-progress.component.html',
  styleUrls: ['./weekly-progress.component.scss']
})
export class WeeklyProgressComponent implements OnInit {
  @Input() user!: User | null;
  daysTillEndOfWeek = differenceInDays(endOfWeek(new Date(), {weekStartsOn: 1}), new Date());

  constructor() { }

  ngOnInit(): void {
  }

}

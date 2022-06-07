import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../users/models/user.model";
import {endOfWeek} from "date-fns";

@Component({
  selector: 'app-weekly-progress',
  templateUrl: './weekly-progress.component.html',
  styleUrls: ['./weekly-progress.component.scss']
})
export class WeeklyProgressComponent implements OnInit {
  @Input() auth!: User | null;
  // daysTillEndOfWeek =  endOfWeek()

  constructor() { }

  ngOnInit(): void {
  }

}

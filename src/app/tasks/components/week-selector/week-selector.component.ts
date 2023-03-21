import { Component, OnInit } from '@angular/core';
import {faCaretLeft, faCaretRight} from '@fortawesome/free-solid-svg-icons';
import {TaskUserConfigsService} from '../../services/task-user-configs/state/task-user-configs.service';
import {TaskUserConfigsQuery} from '../../services/task-user-configs/state/task-user-configs.query';

@Component({
  selector: 'app-week-selector',
  templateUrl: './week-selector.component.html',
  styleUrls: ['./week-selector.component.scss']
})
export class WeekSelectorComponent implements OnInit {

  left = faCaretLeft;
  right = faCaretRight;

  constructor(
    public taskUserConfigsService: TaskUserConfigsService,
    public taskUserConfigsQuery: TaskUserConfigsQuery,
  ) { }

  ngOnInit(): void {
  }

}

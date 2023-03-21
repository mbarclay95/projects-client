import { Component, OnInit } from '@angular/core';
import {FamiliesQuery} from "../../services/families/state/families.query";
import {TaskUserConfigsQuery} from '../../services/task-user-configs/state/task-user-configs.query';

@Component({
  selector: 'app-my-family-page',
  templateUrl: './my-family-page.component.html',
  styleUrls: ['./my-family-page.component.scss']
})
export class MyFamilyPageComponent implements OnInit {

  constructor(
    public familiesQuery: FamiliesQuery,
    public taskUserConfigsQuery: TaskUserConfigsQuery
  ) { }

  ngOnInit():void {
  }
}

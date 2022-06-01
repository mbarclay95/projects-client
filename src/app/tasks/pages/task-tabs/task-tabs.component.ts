import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {createFamily, Family} from "../../models/family.model";

@Component({
  selector: 'app-task-tabs',
  templateUrl: './task-tabs.component.html',
  styleUrls: ['./task-tabs.component.scss']
})
export class TaskTabsComponent implements OnInit {
  selectedTab: 'Task' | 'Recurring Task' | 'Family' = 'Task';
  openFamilyModal: Subject<Family> = new Subject<Family>();

  constructor() { }

  ngOnInit(): void {
  }

  createEntity() {
    switch (this.selectedTab) {
      case "Family":
        this.openFamilyModal.next(createFamily({id: 0}));
    }
  }
}

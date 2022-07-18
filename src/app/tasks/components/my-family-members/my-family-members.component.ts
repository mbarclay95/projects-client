import {Component, Input, OnInit} from '@angular/core';
import {Family} from "../../models/family.model";
import {ColorEvent} from "ngx-color";
import {User} from "../../../users/models/user.model";
import {UsersService} from "../../../users/services/state/users.service";
import {FamiliesService} from "../../services/families/state/families.service";
import {LegendPosition} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-my-family-members',
  templateUrl: './my-family-members.component.html',
  styleUrls: ['./my-family-members.component.scss']
})
export class MyFamilyMembersComponent implements OnInit {
  @Input() myFamily!: Family;
  newColor?: string;
  newTasksPerWeek?: number;
  isMobile = screen.width < 600;

  constructor(
    private familiesService: FamiliesService,
  ) { }

  ngOnInit(): void {
  }

  saveColor(member: User, popoverOpened: boolean) {
    if (popoverOpened) {
      this.newColor = member.taskUserConfig?.color ?? '';
    } else {
      if (!member.taskUserConfig) {
        return;
      }
      let newTaskConfig = {...member.taskUserConfig};
      if (this.newColor !== undefined) {
        newTaskConfig.color = this.newColor;
        this.newColor = undefined;
      }
      if (this.newTasksPerWeek !== undefined) {
        newTaskConfig.tasksPerWeek = this.newTasksPerWeek;
        this.newTasksPerWeek = undefined;
      }
      this.familiesService.updateTaskUserConfig(this.myFamily.id, member, newTaskConfig);
    }
  }

  colorChanged(newColor: ColorEvent) {
    this.newColor = newColor.color.hex;
  }

  tasksPerWeekChanged(newTasksPerWeek: number) {
    this.newTasksPerWeek = newTasksPerWeek;
  }
}

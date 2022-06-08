import {Component, Input, OnInit} from '@angular/core';
import {Family} from "../../models/family.model";
import {ColorEvent} from "ngx-color";
import {FamiliesService} from "../../services/families/state/families.service";

@Component({
  selector: 'app-my-family-edit-family',
  templateUrl: './my-family-edit-family.component.html',
  styleUrls: ['./my-family-edit-family.component.scss']
})
export class MyFamilyEditFamilyComponent implements OnInit {
  @Input() myFamily!: Family;
  editFamilyName = false;
  newColor: string = '';

  constructor(
    private familiesService: FamiliesService
  ) { }

  ngOnInit(): void {
    this.newColor = this.myFamily.color;
  }

  saveFamilyName(newName: string) {
    this.familiesService.updateFamily(this.myFamily.id, {name: newName});
  }

  colorChanged(newColor: ColorEvent) {
    this.newColor = newColor.color.hex;
  }

  saveColor(popoverOpened: boolean) {
    if (!popoverOpened) {
      this.familiesService.updateFamily(this.myFamily.id, {color: this.newColor});
    }
  }

}

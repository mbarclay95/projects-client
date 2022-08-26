import { Component, OnInit } from '@angular/core';
import {FamiliesQuery} from "../../services/families/state/families.query";
import {MobileHeaderService} from "../../../shared/services/mobile-header.service";

@Component({
  selector: 'app-my-family-page',
  templateUrl: './my-family-page.component.html',
  styleUrls: ['./my-family-page.component.scss']
})
export class MyFamilyPageComponent implements OnInit {

  constructor(
    public familiesQuery: FamiliesQuery,
  ) { }

  ngOnInit():void {
  }
}

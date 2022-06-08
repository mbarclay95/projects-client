import { Component, OnInit } from '@angular/core';
import {FamiliesQuery} from "../../services/families/state/families.query";

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

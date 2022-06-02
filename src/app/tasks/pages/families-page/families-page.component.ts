import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FamiliesQuery} from "../../services/families/state/families.query";
import {Family} from "../../models/family.model";

@Component({
  selector: 'app-families-page',
  templateUrl: './families-page.component.html',
  styleUrls: ['./families-page.component.scss']
})
export class FamiliesPageComponent implements OnInit {
  @Output() openFamilyModal: EventEmitter<Family> = new EventEmitter<Family>();

  constructor(
    public familiesQuery: FamiliesQuery
  ) { }

  ngOnInit(): void {
  }

}

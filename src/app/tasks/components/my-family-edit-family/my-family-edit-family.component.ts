import {Component, Input, OnInit} from '@angular/core';
import {Family} from "../../models/family.model";
import {faCog} from '@fortawesome/free-solid-svg-icons';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-my-family-edit-family',
  templateUrl: './my-family-edit-family.component.html',
  styleUrls: ['./my-family-edit-family.component.scss']
})
export class MyFamilyEditFamilyComponent implements OnInit {
  @Input() myFamily!: Family;

  openFamilyModal: Subject<Family> = new Subject<Family>();
  settings = faCog;

  constructor() { }

  ngOnInit(): void {
  }
}

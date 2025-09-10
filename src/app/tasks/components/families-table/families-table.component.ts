import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { Family } from '../../models/family.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-families-table',
  templateUrl: './families-table.component.html',
  styleUrls: ['./families-table.component.scss'],
  standalone: false,
})
export class FamiliesTableComponent implements OnInit {
  @ViewChild('familiesTableTag', { static: true }) familiesTable: NzTableComponent<Family> | undefined;
  @Input() set families(families: Family[] | null) {
    if (families) {
      this._families = families;
    }
  }
  @Output() openFamilyModal: EventEmitter<number> = new EventEmitter<number>();

  _families: Family[] = [];
  edit = faEdit;

  constructor() {}

  ngOnInit(): void {}
}

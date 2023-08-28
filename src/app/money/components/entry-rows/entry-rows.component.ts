import {Component, Input, OnInit} from '@angular/core';
import {Entry} from '../../models/entry.model';

@Component({
  selector: 'app-entry-rows',
  templateUrl: './entry-rows.component.html',
  styleUrls: ['./entry-rows.component.scss']
})
export class EntryRowsComponent implements OnInit {
  @Input() entries: Entry[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

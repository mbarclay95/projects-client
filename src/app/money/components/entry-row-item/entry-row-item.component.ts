import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Entry} from '../../models/entry.model';

@Component({
  selector: 'app-entry-row-item',
  templateUrl: './entry-row-item.component.html',
  styleUrls: ['./entry-row-item.component.scss']
})
export class EntryRowItemComponent implements OnInit {
  @Input() entry!: Entry;
  @Output() editEntry: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}

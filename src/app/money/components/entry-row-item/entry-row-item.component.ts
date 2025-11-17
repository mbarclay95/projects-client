import { Component, inject, Input } from '@angular/core';
import { IncompleteEntry } from '../../models/entry.model';
import { IncompleteEntriesSignalStore } from '../../services/incomplete-entries-signal-store';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { NzTagComponent } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-entry-row-item',
  templateUrl: './entry-row-item.component.html',
  styleUrls: ['./entry-row-item.component.scss'],
  imports: [CurrencyPipe, DatePipe, NzTagComponent],
})
export class EntryRowItemComponent {
  @Input() entry!: IncompleteEntry;

  readonly entriesStore = inject(IncompleteEntriesSignalStore);
}

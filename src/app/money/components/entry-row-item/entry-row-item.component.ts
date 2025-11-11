import { Component, inject, Input } from '@angular/core';
import { Entry } from '../../models/entry.model';
import { EntriesSignalStore } from '../../services/entries-signal-store';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-entry-row-item',
  templateUrl: './entry-row-item.component.html',
  styleUrls: ['./entry-row-item.component.scss'],
  imports: [CurrencyPipe, DatePipe],
})
export class EntryRowItemComponent {
  @Input() entry!: Entry;

  readonly entriesStore = inject(EntriesSignalStore);
}

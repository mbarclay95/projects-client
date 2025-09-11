import { Component, inject, Input } from '@angular/core';
import { Entry } from '../../models/entry.model';
import { EntriesSignalStore } from '../../services/entries-signal-store';

@Component({
  selector: 'app-entry-row-item',
  templateUrl: './entry-row-item.component.html',
  styleUrls: ['./entry-row-item.component.scss'],
  standalone: false,
})
export class EntryRowItemComponent {
  @Input() entry!: Entry;

  readonly entriesStore = inject(EntriesSignalStore);
}

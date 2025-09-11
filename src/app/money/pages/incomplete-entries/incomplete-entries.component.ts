import { Component, effect, inject } from '@angular/core';
import { EntriesSignalStore } from '../../services/entries-signal-store';

@Component({
  selector: 'app-incomplete-entries',
  templateUrl: './incomplete-entries.component.html',
  styleUrls: ['./incomplete-entries.component.scss'],
  standalone: false,
})
export class IncompleteEntriesComponent {
  readonly entriesStore = inject(EntriesSignalStore);

  constructor() {
    effect(() => {
      this.entriesStore.setQueryString(this.entriesStore.buildQueryString());
      this.entriesStore.loadAll({});
    });
  }
}

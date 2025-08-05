import { Component, OnInit } from '@angular/core';
import { EntriesService } from '../../services/entries/state/entries.service';
import { EntriesQuery } from '../../services/entries/state/entries.query';
import { Subject } from 'rxjs';
import { Entry } from '../../models/entry.model';

@Component({
  selector: 'app-incomplete-entries',
  templateUrl: './incomplete-entries.component.html',
  styleUrls: ['./incomplete-entries.component.scss'],
})
export class IncompleteEntriesComponent implements OnInit {
  createEditEntry: Subject<Entry> = new Subject<Entry>();

  constructor(
    public entriesService: EntriesService,
    public entriesQuery: EntriesQuery,
  ) {}

  ngOnInit(): void {
    void this.entriesService.get('incomplete=1');
  }
}

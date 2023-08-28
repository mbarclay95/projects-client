import { Component, OnInit } from '@angular/core';
import {EntriesService} from '../../services/entries/state/entries.service';
import {EntriesQuery} from '../../services/entries/state/entries.query';

@Component({
  selector: 'app-incomplete-entries',
  templateUrl: './incomplete-entries.component.html',
  styleUrls: ['./incomplete-entries.component.scss']
})
export class IncompleteEntriesComponent implements OnInit {

  constructor(
      public entriesService: EntriesService,
      public entriesQuery: EntriesQuery,
  ) { }

  ngOnInit(): void {
    void this.entriesService.get('incomplete=1');
  }

}

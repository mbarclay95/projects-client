import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { createEntry, Entry } from '../../../models/entry.model';
import { EntriesStore } from './entries.store';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EntriesService {
  constructor(
    private entriesStore: EntriesStore,
    private http: HttpClient,
  ) {}

  async get(queryString: string): Promise<void> {
    await firstValueFrom(
      this.http.get<Entry[]>(`${environment.moneyAppApiUrl}/entries?${queryString}`).pipe(
        map((entries) => entries.map((entry) => createEntry(entry))),
        tap((entities) => this.entriesStore.set(entities)),
      ),
    );
  }
}

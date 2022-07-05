import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {createEvent, Event} from '../../../models/event.model';
import {EventsStore, EventsUiState} from './events.store';
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {EventsQuery} from "./events.query";
import {TaskUiState} from "../../../../tasks/services/tasks/state/tasks.store";

@Injectable({ providedIn: 'root' })
export class EventsService {

  constructor(
    private eventsStore: EventsStore,
    private http: HttpClient,
    private eventsQuery: EventsQuery
  ) {
  }

  async getEvents(queryString: string = this.eventsQuery.getQueryString()): Promise<void> {
    await firstValueFrom(this.http.get<Event[]>(`${environment.apiUrl}/events?${queryString}`).pipe(
      map(events => events.map(event => createEvent(event))),
      tap(events => this.eventsStore.set(events))
    ));
  }

  updateUi(newState: Partial<EventsUiState>): void {
    const newUi = {...this.eventsQuery.getUi(), ...newState};
    this.eventsStore.update({ui: newUi});
    this.getEvents(this.eventsQuery.getQueryString());
  }

  async updateEvent(id: number, event: Event) {
    await firstValueFrom(this.http.put<Event>(`${environment.apiUrl}/events/${id}`, event).pipe(
      map(event => createEvent(event)),
      tap(event => this.eventsStore.update(id, event))
    ));
  }

  async createEvent(event: Event) {
    await firstValueFrom(this.http.post<Event>(`${environment.apiUrl}/events`, event).pipe(
      map(event => createEvent(event)),
      tap(event => this.eventsStore.add(event))
    ));
  }

  async archiveEvent(event: Event) {
    await firstValueFrom(this.http.delete(`${environment.apiUrl}/events/${event.id}`).pipe(
      tap(() => this.eventsStore.remove(event.id))
    ));
  }
}

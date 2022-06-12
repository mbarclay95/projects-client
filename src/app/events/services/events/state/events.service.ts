import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {createEvent, Event} from '../../../models/event.model';
import { EventsStore } from './events.store';
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {EventsQuery} from "./events.query";

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


  async updateEvent(id: number, event: Event) {

  }

  async createEvent(event: Event) {
    console.log(event);
  }
}

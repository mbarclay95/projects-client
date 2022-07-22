import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, firstValueFrom, map, Observable, tap} from "rxjs";
import {createEvent, Event} from "../models/event.model";
import {environment} from "../../../environments/environment";
import {createEventParticipant} from "../models/event-participant";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventSubject: BehaviorSubject<Event|undefined> = new BehaviorSubject<Event|undefined>(undefined);
  event$: Observable<Event|undefined> = this.eventSubject.asObservable();

  spotsFull$: Observable<boolean> = this.event$.pipe(
    map(event => event?.eventParticipants.length === event?.numOfPeople)
  );

  constructor(
    private http: HttpClient
  ) { }

  async getEvent(eventId: string, token: string): Promise<void> {
    await firstValueFrom(this.http.get<Event>(`${environment.eventSignupApiUrl}/events/${eventId}?token=${token}`).pipe(
      map(event => createEvent(event)),
      tap(event => this.eventSubject.next(event))
    ));
  }

  async createEventParticipant(name: string): Promise<void> {
    const event = createEvent(this.eventSubject.value ?? {});
    await firstValueFrom(this.http.post(`${environment.eventSignupApiUrl}/event-participants`, {name, eventId: event.id}).pipe(
      map(participant => createEventParticipant(participant)),
      tap(participant => {
        event.eventParticipants.push(participant);
        this.eventSubject.next(event);
      })
    ));
  }

  eventNotLoaded(): boolean {
    return !this.eventSubject.value;
  }
}

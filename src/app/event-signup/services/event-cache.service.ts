import { Injectable } from '@angular/core';
import {EventCache} from "../models/event-cache.model";
import {EventParticipant} from "../models/event-participant";
import {BehaviorSubject, combineLatest, filter, Observable} from "rxjs";
import {EventService} from "./event.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EventCacheService {
  private readonly cacheKey = 'event_cache';
  private eventCache: BehaviorSubject<EventCache[]> = new BehaviorSubject<EventCache[]>([]);

  signedUp$: Observable<boolean> = combineLatest([
    this.eventService.event$.pipe(
      filter(event => !!event)
    ),
    this.eventCache.asObservable().pipe(
      filter(eventCache => eventCache.length > 0)
    )
  ]).pipe(
    map(([event, eventCache]) => !!eventCache.find(ec => ec.eventId === event?.id))
  );

  constructor(
    private eventService: EventService
  ) { }

  loadEventCache(): void {
    this.eventCache.next(JSON.parse(localStorage.getItem(this.cacheKey) ?? '[]'));
  }

  setEventCache(): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(this.eventCache.value));
  }

  loadNewParticipantIntoCache(eventId: number, eventParticipant: EventParticipant) {
    const eventCache = this.eventCache.value;
    eventCache.push({
      eventId,
      name: eventParticipant.name,
      isGoing: eventParticipant.isGoing
    });
    this.eventCache.next(eventCache);
    this.setEventCache();
  }
}

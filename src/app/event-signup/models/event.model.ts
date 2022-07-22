import {createEventParticipant, EventParticipant} from "./event-participant";

export interface Event {
  id: number;
  eventDate: Date;
  numOfPeople: number;
  notes?: string;
  name: string;
  eventParticipants: EventParticipant[];
}

export function createEvent(params: Partial<Event>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    notes: params.name ?? null,
    eventDate: params.eventDate ? new Date(params.eventDate) : null,
    numOfPeople: params.numOfPeople ?? 0,
    eventParticipants: params.eventParticipants ? params.eventParticipants.map(p => createEventParticipant(p)) : [],
  } as Event;
}

import {createEventParticipant, EventParticipant} from "./event-participant";

export interface Event {
  id: number;
  eventDate: Date;
  numOfPeople: number;
  notes?: string;
  name: string;
  limitParticipants: boolean;
  eventParticipants: EventParticipant[];
  eventParticipantsNotGoing: EventParticipant[];
}

export function createEvent(params: Partial<Event>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    notes: params.notes ?? null,
    limitParticipants: params.limitParticipants ?? false,
    eventDate: params.eventDate ? new Date(params.eventDate) : null,
    numOfPeople: params.numOfPeople ?? 0,
    eventParticipants: params.eventParticipants ? params.eventParticipants.filter(p => p.isGoing).map(p => createEventParticipant(p)) : [],
    eventParticipantsNotGoing: params.eventParticipants ? params.eventParticipants.filter(p => !p.isGoing).map(p => createEventParticipant(p)) : [],
  } as Event;
}

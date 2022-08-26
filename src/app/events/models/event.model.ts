import {createEventParticipant, EventParticipant} from "./event-participant";

export interface Event {
  id: number;
  deletedAt: Date;
  eventDate: Date;
  numOfPeople: number;
  token: string;
  notes?: string;
  name: string;
  notificationEmail?: string;
  limitParticipants: boolean;
  eventParticipants: EventParticipant[];
  // eventParticipantsNotGoing: EventParticipant[];
  eventUrl: string;
}

export function createEvent(params: Partial<Event>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    notes: params.notes ?? null,
    eventDate: params.eventDate ? new Date(params.eventDate) : null,
    deletedAt: params.deletedAt ? new Date(params.deletedAt) : null,
    numOfPeople: params.numOfPeople ?? 0,
    limitParticipants: params.limitParticipants ?? false,
    token: params.token ?? null,
    notificationEmail: params.notificationEmail ?? undefined,
    eventParticipants: params.eventParticipants ? params.eventParticipants.map(p => createEventParticipant(p)) : [],
    // eventParticipantsNotGoing: params.eventParticipants ? params.eventParticipants.filter(p => !p.isGoing).map(p => createEventParticipant(p)) : [],
    eventUrl: `/events/signup/${params.id}?token=${params.token}`
  } as Event;
}

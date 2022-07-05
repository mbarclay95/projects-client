export interface Event {
  id: number;
  deletedAt: Date;
  eventDate: Date;
  numOfPeople: number;
  token: string;
  notes?: string;
  name: string;
}

export function createEvent(params: Partial<Event>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    notes: params.name ?? null,
    eventDate: params.eventDate ? new Date(params.eventDate) : null,
    deletedAt: params.deletedAt ? new Date(params.deletedAt) : null,
    numOfPeople: params.numOfPeople ?? 0,
    token: params.token ?? null
  } as Event;
}

export interface EventParticipant {
  id: number;
  name: string;
  isGoing: boolean;
  eventId: number;
}

export function createEventParticipant(params: Partial<EventParticipant>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    isGoing: params.isGoing ?? false,
    eventId: params.eventId ?? 0,
  } as EventParticipant;
}

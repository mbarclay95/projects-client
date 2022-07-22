export interface EventParticipant {
  name: string;
  isGoing: boolean;
}

export function createEventParticipant(params: Partial<EventParticipant>) {
  return {
    name: params.name ?? '',
    isGoing: params.isGoing ?? false,
  } as EventParticipant;
}

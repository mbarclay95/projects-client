export interface EventParticipant {
  name: string;
}

export function createEventParticipant(params: Partial<EventParticipant>) {
  return {
    name: params.name ?? '',
  } as EventParticipant;
}

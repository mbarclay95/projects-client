export interface EventParticipant {
  id: number;
  name: string;
}

export function createEventParticipant(params: Partial<EventParticipant>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
  } as EventParticipant;
}

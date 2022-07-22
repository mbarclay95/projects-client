export interface EventParticipant {
  id: number;
  name: string;
  isGoing: boolean;
}

export function createEventParticipant(params: Partial<EventParticipant>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    isGoing: params.isGoing ?? false,
  } as EventParticipant;
}

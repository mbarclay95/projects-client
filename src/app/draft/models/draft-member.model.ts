export interface DraftMember {
  id: number;
  name: string;
  pickPosition: number | null;
  claimed: boolean;
}

export function createDraftMember(params: Partial<DraftMember>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    pickPosition: params.pickPosition ?? null,
    claimed: params.claimed ?? false,
  } as DraftMember;
}

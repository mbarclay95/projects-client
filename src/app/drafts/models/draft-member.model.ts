export interface DraftMember {
  id: number;
  draftId: number;
  name: string;
  pickPosition: number | null;
}

export function createDraftMember(params: Partial<DraftMember>) {
  return {
    id: params.id ?? 0,
    draftId: params.draftId ?? 0,
    name: params.name ?? '',
    pickPosition: params.pickPosition ?? null,
  } as DraftMember;
}

export interface DraftAdmin {
  id: number;
  draftId: number;
  userId: number;
}

export function createDraftAdmin(params: Partial<DraftAdmin>) {
  return {
    id: params.id ?? 0,
    draftId: params.draftId ?? 0,
    userId: params.userId ?? 0,
  } as DraftAdmin;
}

export interface DraftPick {
  id: number;
  pickNumber: number;
  draftMemberId: number;
  draftTeamId: number;
  madeByAdmin: boolean;
}

export function createDraftPick(params: Partial<DraftPick>) {
  return {
    id: params.id ?? 0,
    pickNumber: params.pickNumber ?? 0,
    draftMemberId: params.draftMemberId ?? 0,
    draftTeamId: params.draftTeamId ?? 0,
    madeByAdmin: params.madeByAdmin ?? false,
  } as DraftPick;
}

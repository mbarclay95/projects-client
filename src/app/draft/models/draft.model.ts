import { createDraftTeam, DraftTeam } from './draft-team.model';
import { createDraftMember, DraftMember } from './draft-member.model';
import { createDraftPick, DraftPick } from './draft-pick.model';

/**
 * Duplicated from `src/app/drafts-admin/models/draft.model.ts` rather than shared —
 * the admin `Draft` carries `token` and `draftAdmins`, which the public
 * payload never does. See public-draft.md.
 */
export enum DraftStatus {
  signup = 'signup',
  locked = 'locked',
  inProgress = 'in_progress',
  complete = 'complete',
}

export interface Draft {
  id: number;
  name: string;
  notes?: string;
  draftDate: Date;
  status: DraftStatus;
  totalRounds: number;
  maxParticipants?: number;
  hasImage: boolean;
  spotsRemaining?: number;
  currentRound: number;
  currentPickNumber: number;
  onTheClockMemberId?: number;
  draftTeams: DraftTeam[];
  draftMembers: DraftMember[];
  draftPicks: DraftPick[];
}

export function createDraft(params: Partial<Draft>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    notes: params.notes ?? undefined,
    draftDate: params.draftDate ? new Date(params.draftDate) : null,
    status: params.status ?? DraftStatus.signup,
    totalRounds: params.totalRounds ?? 1,
    maxParticipants: params.maxParticipants ?? undefined,
    hasImage: params.hasImage ?? false,
    spotsRemaining: params.spotsRemaining ?? undefined,
    currentRound: params.currentRound ?? 1,
    currentPickNumber: params.currentPickNumber ?? 1,
    onTheClockMemberId: params.onTheClockMemberId ?? undefined,
    draftTeams: params.draftTeams ? params.draftTeams.map((t) => createDraftTeam(t)) : [],
    draftMembers: params.draftMembers ? params.draftMembers.map((m) => createDraftMember(m)) : [],
    draftPicks: params.draftPicks ? params.draftPicks.map((p) => createDraftPick(p)) : [],
  } as Draft;
}

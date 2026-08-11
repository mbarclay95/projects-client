import { createDraftAdmin, DraftAdmin } from './draft-admin.model';
import { createDraftTeam, DraftTeam } from './draft-team.model';
import { createDraftMember, DraftMember } from './draft-member.model';
import { createDraftPick, DraftPick } from './draft-pick.model';

export enum DraftStatus {
  signup = 'signup',
  locked = 'locked',
  inProgress = 'in_progress',
  complete = 'complete',
}

export const DRAFT_STATUS_LABELS: Record<DraftStatus, string> = {
  [DraftStatus.signup]: 'Signup',
  [DraftStatus.locked]: 'Locked',
  [DraftStatus.inProgress]: 'In Progress',
  [DraftStatus.complete]: 'Complete',
};

export const DRAFT_STATUS_COLORS: Record<DraftStatus, string> = {
  [DraftStatus.signup]: 'blue',
  [DraftStatus.locked]: 'orange',
  [DraftStatus.inProgress]: 'processing',
  [DraftStatus.complete]: 'green',
};

export interface Draft {
  id: number;
  name: string;
  notes?: string;
  draftDate: Date;
  token: string;
  status: DraftStatus;
  totalRounds: number;
  maxParticipants?: number;
  createdById: number;
  deletedAt: Date;
  draftAdmins: DraftAdmin[];
  draftTeams: DraftTeam[];
  draftMembers: DraftMember[];
  draftPicks: DraftPick[];
  draftUrl: string;
}

export function createDraft(params: Partial<Draft>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    notes: params.notes ?? undefined,
    draftDate: params.draftDate ? new Date(params.draftDate) : null,
    token: params.token ?? null,
    status: params.status ?? DraftStatus.signup,
    totalRounds: params.totalRounds ?? 1,
    maxParticipants: params.maxParticipants ?? undefined,
    createdById: params.createdById ?? 0,
    deletedAt: params.deletedAt ? new Date(params.deletedAt) : null,
    draftAdmins: params.draftAdmins ? params.draftAdmins.map((a) => createDraftAdmin(a)) : [],
    draftTeams: params.draftTeams ? params.draftTeams.map((t) => createDraftTeam(t)) : [],
    draftMembers: params.draftMembers ? params.draftMembers.map((m) => createDraftMember(m)) : [],
    draftPicks: params.draftPicks ? params.draftPicks.map((p) => createDraftPick(p)) : [],
    draftUrl: `/draft/${params.id}?token=${params.token}`,
  } as Draft;
}

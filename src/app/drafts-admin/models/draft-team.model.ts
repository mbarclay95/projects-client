import { environment } from '../../../environments/environment';

export interface DraftTeam {
  id: number;
  draftId: number;
  name: string;
  s3Path?: string;
  sortOrder: number;
  imagePath: string;
}

export function createDraftTeam(params: Partial<DraftTeam>) {
  return {
    id: params.id ?? 0,
    draftId: params.draftId ?? 0,
    name: params.name ?? '',
    s3Path: params.s3Path ?? undefined,
    sortOrder: params.sortOrder ?? 0,
    imagePath: `${environment.apiUrl}/draft-team-images/${params.id}`,
  } as DraftTeam;
}

import { environment } from '../../../environments/environment';

export interface DraftImage {
  id: number;
  originalFileName: string;
  imagePath: string;
}

export function createDraftImage(params: Partial<DraftImage>): DraftImage {
  return {
    id: params.id,
    originalFileName: params.originalFileName ?? null,
    imagePath: `${environment.apiUrl}/draft-images/${params.id}`,
  } as DraftImage;
}

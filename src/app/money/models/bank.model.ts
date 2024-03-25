import {environment} from '../../../environments/environment';

export interface Bank {
  id: number;
  name: string;
  fileUploadId: null | number;
  filePath: string | null;
}

export function createBank(params: Partial<Bank>): Bank {
  return {
    id: params.id,
    name: params.name ?? '',
    fileUploadId: params.fileUploadId ?? null,
    filePath: params.fileUploadId ? `${environment.moneyAppApiUrl}/upload-file/${params.fileUploadId}` : null
  } as Bank;
}

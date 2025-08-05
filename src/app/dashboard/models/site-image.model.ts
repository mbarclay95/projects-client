import { environment } from '../../../environments/environment';

export interface SiteImage {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  s3Path: string;
  originalFileName: string;
  imagePath: string;
}

export function createSiteImage(params: Partial<SiteImage>): SiteImage {
  return {
    id: params.id,
    createdAt: params.createdAt ? new Date(params.createdAt) : null,
    updatedAt: params.updatedAt ? new Date(params.updatedAt) : null,
    s3Path: params.s3Path ?? null,
    originalFileName: params.originalFileName ?? null,
    imagePath: `${environment.apiUrl}/site-images/${params.id}`,
  } as SiteImage;
}

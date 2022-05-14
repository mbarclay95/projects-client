import {createSiteImage, SiteImage} from './site-image.model';

export interface Site {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  show: boolean;
  sort: number;
  url: string;
  folderId: number;
  siteImage: SiteImage;
}

export function createSite(params: Partial<Site>): Site {
  return {
    id: params.id,
    createdAt: params.createdAt ? new Date(params.createdAt) : null,
    updatedAt: params.updatedAt ? new Date(params.updatedAt) : null,
    name: params.name ?? null,
    description: params.description ?? null,
    url: params.url ?? null,
    sort: Number.isNaN(params.sort) ? null : Number(params.sort),
    folderId: Number.isNaN(params.folderId) ? null : Number(params.folderId),
    show: !!params.show,
    siteImage: params.siteImage ? createSiteImage(params.siteImage) : null
  } as Site;
}

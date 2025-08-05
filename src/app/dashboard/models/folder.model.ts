import { createSite, Site } from './site.model';

export interface Folder {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  show: boolean;
  sort: number;
  sites: Site[];
}

export function createFolder(params: Partial<Folder>): Folder {
  return {
    id: params.id,
    createdAt: params.createdAt ? new Date(params.createdAt) : null,
    updatedAt: params.updatedAt ? new Date(params.updatedAt) : null,
    name: params.name ?? null,
    sort: Number.isNaN(params.sort) ? null : Number(params.sort),
    show: !!params.show,
    sites: params.sites ? params.sites.map((s) => createSite(s)) : [],
  } as Folder;
}

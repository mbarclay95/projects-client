export interface DirectoryItem {
  id: string;
  type: 'dir' | 'file';
}

export function createDirectoryItem(params: Partial<DirectoryItem>) {
  return {
    id: params.id,
    type: params.type,
  } as DirectoryItem;
}

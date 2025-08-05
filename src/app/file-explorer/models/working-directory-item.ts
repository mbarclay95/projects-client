export interface WorkingDirectoryItem {
  sort: number;
  path: string;
}

export function workingDirectoryToString(workingDirectory: WorkingDirectoryItem[]): string {
  return [...workingDirectory]
    .sort((a, b) => a.sort - b.sort)
    .map((part) => part.path)
    .join('/');
}

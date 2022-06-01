export interface Family {
  id: number;
  name: string;
}

export function createFamily(params: Partial<Family>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
  } as Family;
}

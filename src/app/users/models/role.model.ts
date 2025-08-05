export interface Role {
  id: number;
  name: string;
}

export function createRole(params: Partial<Role>) {
  return {
    id: params.id,
    name: params.name ?? '',
  } as Role;
}

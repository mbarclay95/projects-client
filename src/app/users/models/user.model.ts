export interface User {
  id: number;
  name: string;
  createdAt: Date;
  lastLoggedInAt: Date;
}

export function createUser(params: Partial<User>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    createdAt: params.createdAt ? new Date(params.createdAt) : new Date(),
    lastLoggedInAt: params.lastLoggedInAt ? new Date(params.lastLoggedInAt) : new Date()
  } as User;
}

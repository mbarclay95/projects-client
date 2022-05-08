export interface Target {
  id: number;
  name: string;
  targetUrl: string;
  hostName: string;
}

export function createTarget(params: Partial<Target>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    targetUrl: params.targetUrl ?? '',
    hostName: params.hostName ?? '',
  } as Target;
}

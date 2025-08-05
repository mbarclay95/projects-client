export interface HeartbeatItem {
  monitorId: number;
  msg: string;
  status: number;
}

export function createHeartbeatItem(params: Partial<HeartbeatItem & { monitorID: number }>): HeartbeatItem {
  return {
    monitorId: Number(params.monitorID),
    msg: params.msg ?? '',
    status: Number(params.status ?? 1),
  } as HeartbeatItem;
}

export enum HeartbeatStatus {
  down = 0,
  up = 1,
  pending = 2,
  maintenance = 3,
}

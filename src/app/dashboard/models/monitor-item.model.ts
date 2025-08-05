import { HeartbeatItem } from './heartbeat-item.model';

export interface MonitorItem {
  id: number;
  name: string;
  isActive: boolean;
  url: string;
  isDown: boolean;
  lastHeartBeat?: HeartbeatItem;
}

export function createMonitorItem(params: any): MonitorItem {
  return {
    id: params.id,
    name: params.name ?? '',
    isActive: params.active && !params.maintenance,
    url: params.url ?? '',
    isDown: false,
    lastHeartBeat: undefined,
  } as MonitorItem;
}

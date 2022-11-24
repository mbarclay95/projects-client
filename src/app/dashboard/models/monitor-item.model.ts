import {HeartbeatItem} from './heartbeat-item.model';

export interface MonitorItem {
  id: number;
  name: string;
  url: string;
  isDown: boolean;
  lastHeartBeat?: HeartbeatItem;
}

export function createMonitorItem(params: Partial<MonitorItem>): MonitorItem {
  return {
    id: params.id,
    name: params.name ?? '',
    url: params.url ?? '',
    isDown: false,
    lastHeartBeat: undefined
  } as MonitorItem;
}

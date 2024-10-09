import {createGamingDevice, GamingDevice} from './gaming-device.model';

export interface GamingSessionDevice {
  id: number;
  name: string;
  metadata: {};
  gamingDevice: GamingDevice;
  gamingSessionId: number;
}

export function createGamingSessionDevice(params: Partial<GamingSessionDevice>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    metadata: params.metadata,
    gamingDevice: createGamingDevice(params.gamingDevice ?? {}),
    gamingSessionId: params.gamingSessionId,
  } as GamingSessionDevice;
}



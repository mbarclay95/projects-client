import {createGamingDevice, GamingDevice} from './gaming-device.model';

export interface GamingSessionDevice {
  id: number;
  name: string;
  metadata: {};
  gamingDevice: GamingDevice
}

export function createGamingSessionDevice(params: Partial<GamingSessionDevice>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    metadata: params.metadata,
    gamingDevice: createGamingDevice(params.gamingDevice ?? {}),
  } as GamingSessionDevice;
}



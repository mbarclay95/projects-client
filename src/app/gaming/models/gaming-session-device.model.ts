import { createGamingDevice, GamingDevice } from './gaming-device.model';

export interface GamingSessionDevice {
  id: number;
  name: string;
  gamingDevice: GamingDevice;
  gamingSessionId: number;
  turnTimeDisplayMode: 'none' | 'graph' | 'numeric';
  currentTurnOrder: number;
  nextTurnOrder: number | null;
  skip: boolean;
  hasPassed: boolean;
}

export function createGamingSessionDevice(params: Partial<GamingSessionDevice>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    gamingDevice: createGamingDevice(params.gamingDevice ?? {}),
    gamingSessionId: params.gamingSessionId,
    turnTimeDisplayMode: params.turnTimeDisplayMode ?? 'numeric',
    currentTurnOrder: params.currentTurnOrder,
    nextTurnOrder: params.nextTurnOrder ?? null,
    skip: params.skip ?? false,
    hasPassed: params.hasPassed ?? false,
  } as GamingSessionDevice;
}

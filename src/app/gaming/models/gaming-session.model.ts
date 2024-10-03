import {createGamingSessionDevice, GamingSessionDevice} from './gaming-session-device.model';

export interface GamingSession {
  id: number;
  name: string;
  code: string;
  sessionType: string;
  isActive: boolean;
  gamingSessionDevices: GamingSessionDevice[];
}

export function createGamingSession(params: Partial<GamingSession>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    code: params.code ?? '',
    sessionType: params.sessionType ?? '',
    isActive: params.isActive ?? true,
    gamingSessionDevices: (params.gamingSessionDevices ?? []).map(s => createGamingSessionDevice(s)),
  } as GamingSession;
}



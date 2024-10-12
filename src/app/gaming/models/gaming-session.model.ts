import {createGamingSessionDevice, GamingSessionDevice} from './gaming-session-device.model';

export interface GamingSession {
  id: number;
  name: string;
  startedAt: Date | null;
  endedAt: Date | null;
  turnOrderType: 'static' | 'variable';
  currentTurn: number;
  allowTurnPassing: boolean;
  skipAfterPassing: boolean;
  pauseAtBeginningOfRound: boolean;
  isPaused: boolean;
  turnLimitSeconds: number;
  gamingSessionDevices: GamingSessionDevice[];
}

export function createGamingSession(params: Partial<GamingSession>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    startedAt: params.startedAt ? new Date(params.startedAt) : null,
    endedAt: params.endedAt ? new Date(params.endedAt) : null,
    turnOrderType: params.turnOrderType ?? 'static',
    currentTurn: params.currentTurn ?? 1,
    allowTurnPassing: params.allowTurnPassing ?? false,
    skipAfterPassing: params.skipAfterPassing ?? true,
    pauseAtBeginningOfRound: params.pauseAtBeginningOfRound ?? true,
    isPaused: params.isPaused ?? false,
    turnLimitSeconds: params.turnLimitSeconds ?? 120,
    gamingSessionDevices: (params.gamingSessionDevices ?? []).map(s => createGamingSessionDevice(s)).sort((a, b) => a.currentTurnOrder - b.currentTurnOrder),
  } as GamingSession;
}



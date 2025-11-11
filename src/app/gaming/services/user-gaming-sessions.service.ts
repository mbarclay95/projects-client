import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGamingSessionsService {
  private sessionUserState: BehaviorSubject<UserGamingSessions> = new BehaviorSubject<UserGamingSessions>({});
  sessionUserState$: Observable<UserGamingSessions> = this.sessionUserState.asObservable();

  constructor() {
    this.initialize();
  }

  initialize(): void {
    const state = localStorage.getItem(GAMING_STORAGE_KEY);
    if (state) {
      this.sessionUserState.next(JSON.parse(state));
    }
  }

  setSessionUser(gamingSessionId: number, gamingSessionDeviceId: number): void {
    const state = this.sessionUserState.getValue();
    state[gamingSessionId] = {
      gamingSessionDeviceId,
    };
    localStorage.setItem(GAMING_STORAGE_KEY, JSON.stringify(state));
    this.sessionUserState.next(state);
  }

  clearForSession(gamingSessionId: number): void {
    const state = this.sessionUserState.getValue();
    delete state[gamingSessionId];
    localStorage.setItem(GAMING_STORAGE_KEY, JSON.stringify(state));
    this.sessionUserState.next(state);
  }
}

export type UserGamingSessions = Record<
  number,
  {
    gamingSessionDeviceId: number;
  }
>;

const GAMING_STORAGE_KEY = 'user_gaming_sessions';

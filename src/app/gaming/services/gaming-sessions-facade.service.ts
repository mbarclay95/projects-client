import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, tap, combineLatest, shareReplay, switchMap, Subject, takeUntil } from 'rxjs';
import { createGamingSession, GamingSession } from '../models/gaming-session.model';
import { createGamingDevice, GamingDevice } from '../models/gaming-device.model';
import { GamingSessionsService } from './gaming-sessions.service';
import { GamingDevicesService } from './gaming-devices.service';
import { map } from 'rxjs/operators';
import { differenceInSeconds } from 'date-fns';
import { MobileDisplayService } from '../../shared/services/mobile-display.service';
import { UserGamingSessionsService } from './user-gaming-sessions.service';
import { createGamingSessionDevice, GamingSessionDevice } from '../models/gaming-session-device.model';
import { GamingSessionDevicesService } from './gaming-session-devices.service';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class GamingSessionsFacadeService {
  sessionsLoading: WritableSignal<boolean> = signal(true);
  private gamingSessionsSubject: BehaviorSubject<GamingSession[]> = new BehaviorSubject<GamingSession[]>([]);
  private gamingSessionsUiSubject: BehaviorSubject<GamingSessionsUi> = new BehaviorSubject<GamingSessionsUi>({
    showArchived: false,
  });
  private activeGamingSessionId: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  gamingSessions$: Observable<GamingSession[]> = this.gamingSessionsSubject.asObservable();
  gamingSessionsUi$: Observable<GamingSessionsUi> = this.gamingSessionsUiSubject
    .asObservable()
    .pipe(switchMap((ui) => this.loadSessions$(ui)));
  activeGamingSession$: Observable<GamingSession | undefined> = combineLatest([
    this.gamingSessions$,
    this.activeGamingSessionId.asObservable(),
  ]).pipe(
    map(([sessions, activeId]) => {
      if (activeId === undefined) {
        return undefined;
      }

      const activeSession = sessions.find((session) => session.id === activeId);
      if (activeSession) {
        setTimeout(() => this.mobileHeaderService.setTitle(activeSession.name), 0);
      }
      return activeSession;
    }),
    shareReplay(),
  );
  userSessionDeviceId$: Observable<number | undefined> = combineLatest([
    this.activeGamingSession$,
    this.userGamingSessionsService.sessionUserState$,
  ]).pipe(map(([session, userState]) => (session ? userState[session.id]?.gamingSessionDeviceId : undefined)));
  userHasSessionDevice$: Observable<boolean> = this.userSessionDeviceId$.pipe(map((id) => !!id));

  devicesLoading: WritableSignal<boolean> = signal(true);
  private gamingDevicesSubject: BehaviorSubject<GamingDevice[]> = new BehaviorSubject<GamingDevice[]>([]);
  gamingDevices$: Observable<GamingDevice[]> = this.gamingDevicesSubject.asObservable();
  onlineGamingDevices$: Observable<GamingDevice[]> = this.gamingDevices$.pipe(
    map((devices) => devices.filter((device) => differenceInSeconds(new Date(), device.lastSeen) < 120)),
  );

  inactiveSessionDevices$: Observable<GamingDevice[]> = combineLatest([this.activeGamingSession$, this.onlineGamingDevices$]).pipe(
    map(([activeSession, devices]) => {
      if (!activeSession) {
        return [];
      }

      const activeSessionDeviceIds = activeSession.gamingSessionDevices.flatMap((d) => d.gamingDevice.id);
      return devices.filter((device) => !activeSessionDeviceIds.includes(device.id));
    }),
  );

  webSocketSubject = webSocket<WebSocketEvent>('wss://node-red.bigmike.dev/ws/gaming');
  webSocketDestroyer: Subject<void> = new Subject<void>();
  webSocketRetries = 0;

  constructor(
    private gamingSessionsService: GamingSessionsService,
    private gamingDevicesService: GamingDevicesService,
    private gamingSessionDevicesService: GamingSessionDevicesService,
    private mobileHeaderService: MobileDisplayService,
    private userGamingSessionsService: UserGamingSessionsService,
  ) {
    this.connectToWs();
    this.loadDevices();
  }

  connectToWs(): void {
    this.webSocketDestroyer.next();
    this.webSocketSubject.pipe(takeUntil(this.webSocketDestroyer)).subscribe({
      next: (webSocketEvent) => {
        this.webSocketRetries = 0;
        if (webSocketEvent.event === 'gamingSessions') {
          this.gamingSessionsSubject.next(webSocketEvent.data.map((session) => createGamingSession(session)));
        } else if (webSocketEvent.event === 'gamingDevices') {
          this.gamingDevicesSubject.next(webSocketEvent.data.map((device) => createGamingDevice(device)));
        }
      },
      error: () => {
        this.webSocketRetries++;
        if (this.webSocketRetries < 3) {
          this.connectToWs();
        }
      },
    });
  }

  emptyGamingSessions(): boolean {
    return this.gamingSessionsSubject.getValue().length === 0;
  }

  updateUi(newUi: Partial<GamingSessionsUi>): void {
    this.gamingSessionsUiSubject.next({ ...this.gamingSessionsUiSubject.getValue(), ...newUi });
  }

  setSessionActiveId(id: number) {
    this.activeGamingSessionId.next(id);
  }

  loadSessions$<T extends GamingSessionsUi | undefined>(ui: T): Observable<T> {
    const queryParams = ui?.showArchived ? 'withArchived=1' : '';
    this.sessionsLoading.set(true);
    return this.gamingSessionsService.get(queryParams).pipe(
      map((sessions) => sessions.map((session) => createGamingSession(session))),
      tap((sessions) => {
        this.gamingSessionsSubject.next(sessions);
        this.sessionsLoading.set(false);
      }),
      map(() => ui),
    );
  }

  loadDevices(): void {
    this.devicesLoading.set(true);
    this.gamingDevicesService
      .get()
      .pipe(
        map((devices) => devices.map((device) => createGamingDevice(device))),
        tap((devices) => {
          this.gamingDevicesSubject.next(devices);
          this.devicesLoading.set(false);
        }),
      )
      .subscribe();
  }

  async createDevicePromise(device: GamingDevice): Promise<void> {
    await firstValueFrom(
      this.gamingDevicesService.create(device).pipe(
        map((d) => createGamingDevice(d)),
        tap((d) => {
          const devices = [...this.gamingDevicesSubject.getValue()];
          devices.push(d);
          this.gamingDevicesSubject.next(devices);
        }),
      ),
    );
  }

  async updateDevicePromise(device: GamingDevice): Promise<void> {
    await firstValueFrom(
      this.gamingDevicesService.update(device).pipe(
        map((d) => createGamingDevice(d)),
        tap((newDevice) =>
          this.gamingDevicesSubject.next([...this.gamingDevicesSubject.getValue()].map((d) => (d.id === newDevice.id ? newDevice : d))),
        ),
      ),
    );
  }

  async createSessionPromise(session: GamingSession): Promise<void> {
    await firstValueFrom(this.gamingSessionsService.create(session));
  }

  async updateSessionPromise(session: GamingSession): Promise<void> {
    await firstValueFrom(
      this.gamingSessionsService.update(session).pipe(
        map((s) => createGamingSession(s)),
        tap((newSession) =>
          this.gamingSessionsSubject.next([...this.gamingSessionsSubject.getValue()].map((s) => (s.id === newSession.id ? newSession : s))),
        ),
      ),
    );
  }

  async createSessionDevicePromise(sessionDevice: GamingSessionDevice): Promise<void> {
    const activeSessionId = this.activeGamingSessionId.getValue()!;
    await firstValueFrom(
      this.gamingSessionDevicesService
        .create(sessionDevice)
        .pipe(tap((s) => this.userGamingSessionsService.setSessionUser(activeSessionId, s.id))),
    );
  }

  async updateSessionDevicePromise(sessionDevice: GamingSessionDevice): Promise<void> {
    const activeSessionId = this.activeGamingSessionId.getValue()!;
    await firstValueFrom(
      this.gamingSessionDevicesService.update(sessionDevice).pipe(
        map((s) => createGamingSessionDevice(s)),
        tap((newSession) => {
          const sessions = [...this.gamingSessionsSubject.getValue()];
          this.gamingSessionsSubject.next(
            sessions.map((session) => {
              if (session.id === activeSessionId) {
                session.gamingSessionDevices = session.gamingSessionDevices.map((s) => {
                  if (s.id === newSession.id) {
                    return newSession;
                  }

                  return s;
                });
              }

              return session;
            }),
          );
        }),
      ),
    );
  }

  updateSessionDeviceTurnOrderCache(sessionId: number, sessionDeviceId: number, newTurnOrder: number): void {
    const updatedSessions = [...this.gamingSessionsSubject.getValue()].map((session) => {
      if (session.id === sessionId) {
        const updatedSessionDevices = session.gamingSessionDevices.map((sessionDevice) => {
          if (sessionDevice.id === sessionDeviceId) {
            return createGamingSessionDevice({ ...sessionDevice, ...{ currentTurnOrder: newTurnOrder } });
          }

          return sessionDevice;
        });
        return createGamingSession({ ...session, ...{ gamingSessionDevices: updatedSessionDevices } });
      }

      return session;
    });

    this.gamingSessionsSubject.next(updatedSessions);
  }

  updateSessionDeviceSort(sessionId: number, movedSessionDevices: { id: number; turnOrder: number }[]): void {
    this.gamingSessionsService.updateSessionDeviceSort(sessionId, movedSessionDevices).subscribe();
  }

  deleteSessionDevice(sessionId: number, sessionDeviceId: number, isUser: boolean): void {
    this.gamingSessionDevicesService.delete(sessionDeviceId).subscribe();
    if (isUser) {
      this.userGamingSessionsService.clearForSession(sessionId);
    }
  }
}

type WebSocketEvent =
  | {
      event: 'gamingDevices';
      data: GamingDevice[];
    }
  | {
      event: 'gamingSessions';
      data: GamingSession[];
    };

export type GamingSessionsUi = {
  showArchived: boolean;
};

import {Injectable, signal, WritableSignal} from '@angular/core';
import {
  BehaviorSubject,
  firstValueFrom,
  Observable,
  tap,
  combineLatest,
  shareReplay,
  Subject,
  exhaustMap, takeUntil, interval
} from 'rxjs';
import {createGamingSession, GamingSession} from '../models/gaming-session.model';
import {createGamingDevice, GamingDevice} from '../models/gaming-device.model';
import {GamingSessionsService} from './gaming-sessions.service';
import {GamingDevicesService} from './gaming-devices.service';
import {map} from 'rxjs/operators';
import {differenceInSeconds} from 'date-fns';
import {MobileHeaderService} from '../../shared/services/mobile-header.service';
import {UserGamingSessionsService} from './user-gaming-sessions.service';
import {createGamingSessionDevice, GamingSessionDevice} from '../models/gaming-session-device.model';
import {GamingSessionDevicesService} from './gaming-session-devices.service';

@Injectable({
  providedIn: 'root'
})
export class GamingSessionsFacadeService {
  sessionsLoading: WritableSignal<boolean> = signal(true);
  private gamingSessionsSubject: BehaviorSubject<GamingSession[]> = new BehaviorSubject<GamingSession[]>([]);
  private activeGamingSessionId: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  gamingSessions$: Observable<GamingSession[]> = this.gamingSessionsSubject.asObservable();
  activeGamingSession$: Observable<GamingSession | undefined> = combineLatest([
    this.gamingSessions$,
    this.activeGamingSessionId.asObservable()
  ]).pipe(
    map(([sessions, activeId]) => {
      if (activeId === undefined) {
        return undefined;
      }

      const activeSession = sessions.find(session => session.id === activeId);
      if (activeSession) {
        setTimeout(() => this.mobileHeaderService.setTitle(activeSession.name), 0);
      }
      return activeSession;
    }),
    shareReplay()
  );
  userHasSessionDevice$: Observable<boolean> = combineLatest([
    this.activeGamingSession$,
    this.userGamingSessionsService.sessionUserState$
  ]).pipe(
    map(([session, userState]) => session ? userState[session.id]?.gamingSessionDeviceId !== undefined : false)
  );

  devicesLoading: WritableSignal<boolean> = signal(true);
  private gamingDevicesSubject: BehaviorSubject<GamingDevice[]> = new BehaviorSubject<GamingDevice[]>([]);
  gamingDevices$: Observable<GamingDevice[]> = this.gamingDevicesSubject.asObservable();
  onlineGamingDevices$: Observable<GamingDevice[]> = this.gamingDevices$.pipe(
    map(devices => devices.filter(device => differenceInSeconds(new Date(), device.lastSeen) < 120))
  );

  activeSessionDevices$: Observable<GamingDevice[]> = combineLatest([
    this.activeGamingSession$,
    this.gamingDevices$
  ]).pipe(
    map(([activeSession, devices]) => {
      if (!activeSession) {
        return [];
      }

      const activeSessionDeviceIds = activeSession.gamingSessionDevices.flatMap(d => d.id);
      return devices.filter((device) => activeSessionDeviceIds.includes(device.id));
    })
  );

  inactiveSessionDevices$: Observable<GamingDevice[]> = combineLatest([
    this.activeGamingSession$,
    this.gamingDevices$
  ]).pipe(
    map(([activeSession, devices]) => {
      if (!activeSession) {
        return [];
      }

      const activeSessionDeviceIds = activeSession.gamingSessionDevices.flatMap(d => d.id);
      return devices.filter((device) => !activeSessionDeviceIds.includes(device.id));
    })
  );

  private destroyDevicePolling: Subject<void> = new Subject<void>();

  constructor(
    private gamingSessionsService: GamingSessionsService,
    private gamingDevicesService: GamingDevicesService,
    private gamingSessionDevicesService: GamingSessionDevicesService,
    private mobileHeaderService: MobileHeaderService,
    private userGamingSessionsService: UserGamingSessionsService
  ) {
  }

  // connectToWs(): void {
  // const subject = webSocket('ws://localhost:8080');
  // subject.subscribe(
  //   msg => console.log(msg)
  // );
  // const pusher = new Pusher('efslrhkkyd6cya63yryy', {
  //   cluster: '',
  //   wsHost: 'localhost',
  //   wsPort: 8080,
  //   forceTLS: false,
  // });
  // pusher.connect();
  // pusher.bind()
  // }

  setSessionActiveId(id: number) {
    this.activeGamingSessionId.next(id);
  }

  loadSessions(): void {
    this.sessionsLoading.set(true);
    this.gamingSessionsService.get().pipe(
      map((sessions) => sessions.map((session) => createGamingSession(session))),
      tap((sessions) => {
        this.gamingSessionsSubject.next(sessions);
        this.sessionsLoading.set(false);
      })
    ).subscribe();
  }

  loadDevices(): void {
    this.devicesLoading.set(true);
    this.gamingDevicesService.get().pipe(
      map((devices) => devices.map((device) => createGamingDevice(device))),
      tap((devices) => {
        this.gamingDevicesSubject.next(devices);
        this.devicesLoading.set(false);
      })
    ).subscribe();
  }

  async createDevicePromise(device: GamingDevice): Promise<void> {
    await firstValueFrom(this.gamingDevicesService.create(device).pipe(
      map(d => createGamingDevice(d)),
      tap(d => {
        const devices = [...this.gamingDevicesSubject.getValue()];
        devices.push(d);
        this.gamingDevicesSubject.next(devices);
      })
    ));
  }

  async updateDevicePromise(device: GamingDevice): Promise<void> {
    await firstValueFrom(this.gamingDevicesService.update(device).pipe(
      map(d => createGamingDevice(d)),
      tap(newDevice => this.gamingDevicesSubject.next([...this.gamingDevicesSubject.getValue()].map((d) => d.id === newDevice.id ? newDevice : d)))
    ));
  }

  async createSessionPromise(session: GamingSession): Promise<void> {
    await firstValueFrom(this.gamingSessionsService.create(session).pipe(
      map(s => createGamingSession(s)),
      tap(s => {
        const sessions = [...this.gamingSessionsSubject.getValue()];
        sessions.push(s);
        this.gamingSessionsSubject.next(sessions);
      })
    ));
  }

  async updateSessionPromise(session: GamingSession): Promise<void> {
    await firstValueFrom(this.gamingSessionsService.update(session).pipe(
      map(s => createGamingSession(s)),
      tap(newSession => this.gamingSessionsSubject.next([...this.gamingSessionsSubject.getValue()].map((s) => s.id === newSession.id ? newSession : s)))
    ));
  }

  async createSessionDevicePromise(sessionDevice: GamingSessionDevice): Promise<void> {
    const activeSessionId = this.activeGamingSessionId.getValue()!;
    await firstValueFrom(this.gamingSessionDevicesService.create(sessionDevice).pipe(
      map(s => createGamingSessionDevice(s)),
      tap(s => {
        this.userGamingSessionsService.setSessionUser(activeSessionId, s.id);
        const sessions = [...this.gamingSessionsSubject.getValue()];
        this.gamingSessionsSubject.next(sessions.map((session) => {
          if (session.id === activeSessionId) {
            session.gamingSessionDevices.push(s);
          }

          return session;
        }));
      })
    ));
  }

  async updateSessionDevicePromise(sessionDevice: GamingSessionDevice): Promise<void> {
    const activeSessionId = this.activeGamingSessionId.getValue()!;
    await firstValueFrom(this.gamingSessionDevicesService.update(sessionDevice).pipe(
      map(s => createGamingSessionDevice(s)),
      tap(newSession => {
        const sessions = [...this.gamingSessionsSubject.getValue()];
        this.gamingSessionsSubject.next(sessions.map((session) => {
            if (session.id === activeSessionId) {
              session.gamingSessionDevices = session.gamingSessionDevices.map((s) => {
                if (s.id === newSession.id) {
                  return newSession;
                }

                return s;
              });
            }

            return session;
          })
        )
      })
    ));
  }

  stopDevicePolling(): void {
    this.destroyDevicePolling.next();
  }

  startDevicePolling(): void {
    interval(10000).pipe(
      takeUntil(this.destroyDevicePolling),
      exhaustMap(() => this.gamingDevicesService.get().pipe(
        map((devices) => devices.map((device) => createGamingDevice(device))),
        tap((devices) => this.gamingDevicesSubject.next(devices))
      ))
    ).subscribe();
  }
}

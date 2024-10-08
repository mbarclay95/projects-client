import {Injectable, signal, WritableSignal} from '@angular/core';
import {BehaviorSubject, firstValueFrom, Observable, tap} from 'rxjs';
import {createGamingSession, GamingSession} from '../models/gaming-session.model';
import {createGamingDevice, GamingDevice} from '../models/gaming-device.model';
import {GamingSessionsService} from './gaming-sessions.service';
import {GamingDevicesService} from './gaming-devices.service';
import {map} from 'rxjs/operators';
import {Socket, SocketIoConfig} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class GamingSessionsFacadeService extends Socket {
  sessionsLoading: WritableSignal<boolean> = signal(true);
  private gamingSessionsSubject: BehaviorSubject<GamingSession[]> = new BehaviorSubject<GamingSession[]>([]);
  private activeGamingSessionId: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  gamingSessions$: Observable<GamingSession[]> = this.gamingSessionsSubject.asObservable();

  devicesLoading: WritableSignal<boolean> = signal(true);
  private gamingDevicesSubject: BehaviorSubject<GamingDevice[]> = new BehaviorSubject<GamingDevice[]>([]);
  gamingDevices$: Observable<GamingDevice[]> = this.gamingDevicesSubject.asObservable();

  constructor(
    private gamingSessionsService: GamingSessionsService,
    private gamingDevicesService: GamingDevicesService,
  ) {
    const config: SocketIoConfig = {
      url: 'ws://localhost:8080/', options: {
        path: '/',
        transports: ['websocket'],
        reconnectionAttempts: 2,
        autoConnect: false,
      }
    };
    super(config);
  }

  connectToWs(): void {
    if (!this.connect().connected) {
      this.connect();
    }
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

    // this.gamingDevicesService.ping().subscribe();
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
}

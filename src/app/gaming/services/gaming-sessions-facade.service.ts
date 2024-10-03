import {Injectable, signal, WritableSignal} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {createGamingSession, GamingSession} from '../models/gaming-session.model';
import {createGamingDevice, GamingDevice} from '../models/gaming-device.model';
import {GamingSessionsService} from './gaming-sessions.service';
import {GamingDevicesService} from './gaming-devices.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamingSessionsFacadeService {
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
  ) { }

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
}

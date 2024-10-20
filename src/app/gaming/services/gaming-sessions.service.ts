import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {GamingSession} from '../models/gaming-session.model';

@Injectable({
  providedIn: 'root'
})
export class GamingSessionsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get(queryParams: string): Observable<GamingSession[]> {
    return this.httpClient.get<GamingSession[]>(`${environment.apiUrl}/gaming/sessions?${queryParams}`);
  }

  create(session: GamingSession): Observable<GamingSession> {
    return this.httpClient.post<GamingSession>(`${environment.apiUrl}/gaming/sessions`, session);
  }

  update(session: GamingSession): Observable<GamingSession> {
    return this.httpClient.patch<GamingSession>(`${environment.apiUrl}/gaming/sessions/${session.id}`, session);
  }

  updateSessionDeviceSort(sessionId: number, movedSessionDevices: { id: number; turnOrder: number }[]): Observable<Object> {
    return this.httpClient.patch(`${environment.apiUrl}/gaming/session-device-turn-orders`, {sessionId, data: movedSessionDevices});
  }
}

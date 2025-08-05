import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GamingSessionDevice } from '../models/gaming-session-device.model';

@Injectable({
  providedIn: 'root',
})
export class GamingSessionDevicesService {
  constructor(private httpClient: HttpClient) {}

  create(sessionDevice: GamingSessionDevice): Observable<GamingSessionDevice> {
    return this.httpClient.post<GamingSessionDevice>(`${environment.apiUrl}/gaming/session-devices`, sessionDevice);
  }

  update(sessionDevice: GamingSessionDevice): Observable<GamingSessionDevice> {
    return this.httpClient.patch<GamingSessionDevice>(`${environment.apiUrl}/gaming/session-devices/${sessionDevice.id}`, sessionDevice);
  }

  delete(sessionDeviceId: number): Observable<Object> {
    return this.httpClient.delete(`${environment.apiUrl}/gaming/session-devices/${sessionDeviceId}`);
  }
}

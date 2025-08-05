import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GamingDevice } from '../models/gaming-device.model';

@Injectable({
  providedIn: 'root',
})
export class GamingDevicesService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<GamingDevice[]> {
    return this.httpClient.get<GamingDevice[]>(`${environment.apiUrl}/gaming/devices`);
  }

  create(device: GamingDevice): Observable<GamingDevice> {
    return this.httpClient.post<GamingDevice>(`${environment.apiUrl}/gaming/devices`, device);
  }

  update(device: GamingDevice): Observable<GamingDevice> {
    return this.httpClient.patch<GamingDevice>(`${environment.apiUrl}/gaming/devices/${device.id}`, device);
  }
}

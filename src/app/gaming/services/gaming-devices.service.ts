import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {GamingDevice} from '../models/gaming-device.model';

@Injectable({
  providedIn: 'root'
})
export class GamingDevicesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get(): Observable<GamingDevice[]> {
    return this.httpClient.get<GamingDevice[]>(`${environment.apiUrl}/gaming/devices`);
  }

  async create(): Promise<void> {
    await firstValueFrom(this.httpClient.post(`${environment.apiUrl}/gaming/devices`, {
      deviceCommunicationId: 'yS9gBd'
    }));
  }
}

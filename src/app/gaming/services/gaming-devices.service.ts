import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamingDevicesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  async get(): Promise<void> {
    await firstValueFrom(this.httpClient.get(`${environment.apiUrl}/gaming/devices`));
  }

  async create(): Promise<void> {
    await firstValueFrom(this.httpClient.post(`${environment.apiUrl}/gaming/devices`, {
      deviceCommunicationId: 'yS9gBd'
    }));
  }
}

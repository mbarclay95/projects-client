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

  get(): Observable<GamingSession[]> {
    return this.httpClient.get<GamingSession[]>(`${environment.apiUrl}/gaming/sessions`);
  }
}

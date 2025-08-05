import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject, firstValueFrom, Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private tagsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  tags$: Observable<string[]> = this.tagsSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  async getTags(): Promise<void> {
    await firstValueFrom(this.http.get<string[]>(`${environment.apiUrl}/tags`).pipe(
      tap(tags => this.tagsSubject.next(tags))
    ));
  }
}

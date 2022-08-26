import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MobileHeaderService {
  private titleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  title$: Observable<string> = this.titleSubject.asObservable();

  private showCreateButtonSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showCreateButton$: Observable<boolean> = this.showCreateButtonSubject.asObservable();

  private clickedButtonSubject: Subject<void> = new Subject<void>();
  clickedButton$: Observable<void> = this.clickedButtonSubject.asObservable();

  constructor() { }

  setTitle(title: string): void {
    this.titleSubject.next(title);
  }

  showCreateButton(): void {
    this.showCreateButtonSubject.next(true);
  }

  hideCreateButton(): void {
    this.showCreateButtonSubject.next(false);
  }

  clickedButton(): void {
    this.clickedButtonSubject.next();
  }
}

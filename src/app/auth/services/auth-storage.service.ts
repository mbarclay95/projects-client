import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  private authToken: string | undefined;
  private moneyAppAuthToken: string | undefined;

  constructor() {
    this.loadAuthToken();
  }

  private loadAuthToken(): void {
    let token = localStorage.getItem('project-app-token');
    if (token) {
      this.authToken = JSON.parse(token);
    }
  }

  setAuthToken(token: string): void {
    localStorage.setItem('project-app-token', JSON.stringify(token));
    this.authToken = token;
  }

  setMoneyAppAuthToken(token: string): void {
    this.moneyAppAuthToken = token;
  }

  getAuthToken(): string | undefined {
    return this.authToken;
  }

  getMoneyAppAuthToken(): string | undefined {
    return this.moneyAppAuthToken;
  }

  isTokenSet(): boolean {
    return !!this.getAuthToken();
  }

  clearToken(): void {
    this.authToken = undefined;
    localStorage.removeItem('project-app-token');
  }
}

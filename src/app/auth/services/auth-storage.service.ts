import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {
  private authToken: string | undefined;

  constructor() {
    this.loadAuthToken();
  }

  private loadAuthToken(): void {
    this.authToken = JSON.parse(localStorage.getItem('token') ?? '');
  }

  setAuthToken(token: string): void {
    localStorage.setItem('token', JSON.stringify(token));
    this.authToken = token;
  }

  getAuthToken(): string | undefined {
    return this.authToken;
  }

  isTokenSet(): boolean {
    return !!this.getAuthToken();
  }

  clearToken(): void {
    this.authToken = undefined;
    localStorage.removeItem('token');
  }

}

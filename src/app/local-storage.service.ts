import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      // @ts-ignore
      return JSON.parse(this.localStorage.getItem(key));
    }
    return null;
  }

  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }

  getAccessToken(): string | null {
    if (this.get('token') == null) {
      return null;
    }
    return this.get('token').access_token
  }

  getRefreshToken(): string | null {
    if (this.get('token') == null) {
      return null;
    }
    return this.get('token').refresh
  }

  isAccessTokenExpired(): boolean {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return true;
    }
    const helper = new JwtHelperService();
    return helper.isTokenExpired(accessToken);
  }

  isRefreshTokenExpired(): boolean {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return true;
    }
    const helper = new JwtHelperService();
    return helper.isTokenExpired(refreshToken);
  }

  clearLocalStorage(): void {
    this.localStorage.clear();
  }
 
}

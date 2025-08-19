import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {environment} from '../../../enviroments/enviroment';
import {TokenResponse} from '../../models/auth/token.model';

@Injectable({ providedIn: 'root' })
export class KickAuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private generateRandomString(length: number): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array)
      .map(b => String.fromCharCode(b % 26 + 97))
      .join('');
  }

  private async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashString = hashArray
      .map(b => String.fromCharCode(b))
      .join('');
    return btoa(hashString)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  async login(): Promise<void> {
    const codeVerifier = this.generateRandomString(64);
    const state = this.generateRandomString(16);

    sessionStorage.setItem('kick_code_verifier', codeVerifier);
    sessionStorage.setItem('kick_state', state);

    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    const authParams = new URLSearchParams({
      client_id: environment.kick.clientId,
      redirect_uri: environment.kick.redirectUri,
      response_type: 'code',
      scope: environment.kick.scopes.join(' '),
      state: state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    });

    const authUrl = `${environment.kick.authUrl}?${authParams.toString()}`;
    window.location.href = authUrl;
  }

  async handleCallback(callbackUrl: string): Promise<TokenResponse> {
    const url = new URL(callbackUrl);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const savedState = sessionStorage.getItem('kick_state');
    const codeVerifier = sessionStorage.getItem('kick_code_verifier');

    if (!code || !state || !savedState || state !== savedState) {
      throw new Error('Invalid callback parameters');
    }

    if (!codeVerifier) {
      throw new Error('Code verifier not found');
    }

    sessionStorage.removeItem('kick_state');

    try {
      const tokenResponse = await firstValueFrom(
        this.http.post<TokenResponse>('/api/kick-auth/token', {
          code,
          redirect_uri: environment.kick.redirectUri,
          code_verifier: codeVerifier
        })
      );

      this.storeTokens(tokenResponse);
      sessionStorage.removeItem('kick_code_verifier');

      return tokenResponse;
    } catch (error) {
      console.error('Token exchange failed:', error);
      throw error;
    }
  }

  private storeTokens(tokens: TokenResponse): void {
    localStorage.setItem('kick_access_token', tokens.access_token);
    const expiresAt = Date.now() + tokens.expires_in * 1000;
    localStorage.setItem('kick_expires_at', expiresAt.toString());

    if (tokens.refresh_token) {
      localStorage.setItem('kick_refresh_token', tokens.refresh_token);
    }
  }

  async getAccessToken(): Promise<string | null> {
    const token = localStorage.getItem('kick_access_token');
    const expiresAt = Number(localStorage.getItem('kick_expires_at'));

    if (!token || !expiresAt) {
      return null;
    }

    if (Date.now() >= expiresAt) {
      const refreshToken = localStorage.getItem('kick_refresh_token');
      if (!refreshToken) {
        return null;
      }

      try {
        const newTokens = await firstValueFrom(
          this.http.post<TokenResponse>('/api/kick-auth/refresh', {
            refresh_token: refreshToken
          })
        );

        this.storeTokens(newTokens);
        return newTokens.access_token;
      } catch (error) {
        console.error('Token refresh failed:', error);
        return null;
      }
    }

    return token;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('kick_access_token');
    const expiresAt = Number(localStorage.getItem('kick_expires_at'));
    return !!token && !!expiresAt && Date.now() < expiresAt;
  }

  logout(): void {
    localStorage.removeItem('kick_access_token');
    localStorage.removeItem('kick_expires_at');
    localStorage.removeItem('kick_refresh_token');
    this.router.navigate(['/']);
  }
}

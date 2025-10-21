import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Auth } from '@models/auth';
import { apiName } from '@shared/Enum/api-name';
import { environment } from '@shared/environment/environment';
import { LocalStorageService } from './local-storage-service.service';
import { Router } from '@angular/router';

export interface JwtPayload {
  sub: string;
  exp: number;
  role: string;
  userName: string;
  Email: string;
  mobilePhone: string;
  permission: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storage = inject(LocalStorageService);
  private readonly router = inject(Router);
  private readonly baseUrl = environment.apiUrl + apiName.auth;
  private readonly tokenKey = environment.token_KEY;

  user = signal<JwtPayload | null>(null);

  login(data: Auth): Observable<{ data: string }> {
    return this.http.post<{ data: string }>(`${this.baseUrl}/signIn`, data);
  }

  saveToken(token: string): void {
    this.storage.set(this.tokenKey, token);
    const decoded = jwtDecode<JwtPayload>(token);
    this.user.set(decoded);
  }

  init(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          this.logout();
        } else {
          this.user.set(decoded);
        }
      } catch {
        this.logout();
      }
    }
  }

  logout(): void {
    this.storage.remove(this.tokenKey);
    this.user.set(null);
    this.router.navigate(['/']).then(() => {
    window.location.reload();
  });
  }

  getToken(): string | null {
    let token: string | null = this.storage.get(this.tokenKey);
    return token;
  }

  getRole(): string | null {
    return this.user()?.role ?? null;
  }

  isAuthenticated(): boolean {
    if (this.getToken() !== null && this.user() === null) {
      this.init();
    }
    return !!this.getToken() && this.user() !== null;
  }

  hasRole(role: string): boolean {
    return this.getRole() === role;
  }
}

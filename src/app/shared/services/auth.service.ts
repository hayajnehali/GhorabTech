import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Auth } from '@models/auth';
import { apiName } from '@shared/Enum/api-name';
import { environment } from '@shared/environment/environment';
import { LocalStorageService } from './local-storage-service.service';
import { Router } from '@angular/router';
import { Roles } from '@shared/Enum/role-enum';

export interface JwtPayload {
  sub: string;
  exp: number;
  role: string;
  userName: string;
  email: string;
  certserialnumber: string;
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

  // ===== Signals =====
  user = signal<JwtPayload | null>(null);
  isAuthenticatedSignal = computed(() => !!this.user());
  isAdmin = computed(() => this.user()?.role === Roles.admin);
  isUser = computed(() => this.user()?.role === Roles.user);

  // ===== API Calls =====
  login(data: Auth): Observable<{ data: string }> {
    return this.http.post<{ data: string }>(`${this.baseUrl}/signIn`, data);
  }

  // ===== Token Management =====
  saveToken(token: string): void {
    this.storage.set(this.tokenKey, token);
    const decoded = jwtDecode<JwtPayload>(token);
    this.user.set(decoded);
  }

  getToken(): string | null {
    return this.storage.get(this.tokenKey);
  }

  getRole(): string | null {
    return this.user()?.role ?? null;
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
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

  // ===== Auth Logic =====
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token || this.isTokenExpired(token)) {
      this.clearToken();
      return false;
    }
    if (token && this.user() === null) {
      this.init();
    }
    return !!token && this.user() !== null;
  }

  hasRole(...roles: string[]): boolean {
    const userRole = this.getRole();
    return !!userRole && roles.includes(userRole);
  }

  // ===== Logout =====
  logout(): void {
    this.clearToken();
    this.router.navigate(['/user']);
    // this.router.navigate(['/']).then(() => {
    //   window.location.reload();
    // });
  }

  private clearToken() {
    this.storage.remove(this.tokenKey);
    this.user.set(null);
  }
}

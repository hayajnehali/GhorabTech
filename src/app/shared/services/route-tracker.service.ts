import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RouteTrackerService {
  private router = inject(Router);
  private previousUrl: string | null = null;
  private currentUrl: string | null = null;

  constructor() {
    this.currentUrl = this.router.url;

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = e.urlAfterRedirects;
      });
  }

  getPreviousUrl() {
    return this.previousUrl;
  }
  getCurrentUrl() {
    return this.previousUrl;
  }
}

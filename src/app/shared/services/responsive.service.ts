import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  private breakpoint = inject(BreakpointObserver);
  isNavBarOpen = signal(false);
  isMobile = toSignal(
    this.breakpoint
      .observe([Breakpoints.Handset])
      .pipe(map((result) => result.matches)),
    { initialValue: false }
  );
  navBarOpen(){
    this.isNavBarOpen.set(!this.isNavBarOpen());
  }
}

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  isMobile$: Observable<boolean>;

  constructor(private breakpoint: BreakpointObserver) {
    this.isMobile$ = this.breakpoint.observe([Breakpoints.Handset]).pipe(
      map((result) => result.matches),
      shareReplay(1)
    );
  }

  // constructor(private breakpointObserver: BreakpointObserver) {
  //   this.breakpointObserver
  //     .observe([Breakpoints.Handset])
  //     // .observe(['(max-width: 766px)'])
  //     .subscribe((screenSize) => {
  //       if (screenSize.matches) {
  //         this.isMobile = true;
  //       } else {
  //         this.isMobile = false;
  //       }
  //     });
  // }
}

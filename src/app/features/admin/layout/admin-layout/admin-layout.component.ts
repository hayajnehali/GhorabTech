import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routesAdmin } from '../../admin-routing.module';
import { ResponsiveService } from '@shared/services/responsive.service';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
  standalone: false,
})
export class AdminLayOutComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  routesList = routesAdmin;
  isCollapsed = true;
  menuOpen = false;
  responsiveService = inject(ResponsiveService);
  constructor(private router: Router) { } 

  toggleMenu() {
    if (this.responsiveService.isMobile()) {
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
    this.menuOpen = !this.menuOpen;
  }
 
  goToPath(arg0: string | undefined) {
    this.router.navigate(['admin/' + arg0]);
    this.responsiveService.navBarOpen();
  }
}

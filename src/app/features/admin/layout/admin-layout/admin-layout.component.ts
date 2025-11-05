import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routesAdmin } from '../../admin-routing.module';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.scss',
    standalone: false
})
export class AdminLayOutComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  routesList =routesAdmin;
  isCollapsed = true;

  constructor(
    private observer: BreakpointObserver,
    private translate: TranslateService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
      this.menuOpen = !this.menuOpen;
  }

  goProductS() {
    this.router.navigate(['admin/products']);
  }
  gocategory() {
    this.router.navigate(['admin/product-categorys']);
  }
  menuOpen = false;

 
}

 
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-guest-layout',
  templateUrl: './guest-layout.component.html',
  styleUrl: './guest-layout.component.scss', 
})
export class GuestLayOutComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;

  isCollapsed = true;
  constructor(private observer: BreakpointObserver,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  
  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }

  switchLanguage(language: string) { 
      this.translate.use(language);
      localStorage.setItem('language', language); 
      this.router.navigate([this.router.url]).then(() => {
        window.location.reload();
      }); 
  }

  goProductS(){
    this.router.navigate(['guest/product']);
  }
  gocategory(){
    this.router.navigate(['admin/categorys']);
  }

  isActive: boolean = false;

  toggleActive(): void {
    this.isActive = !this.isActive;
  }
}

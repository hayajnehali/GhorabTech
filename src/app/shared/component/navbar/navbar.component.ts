import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LanguageButtonComponent } from '../language-button/language-button.component';
import { CategoryResult } from '@models/category';
import { ProductCategoryResult } from '@models/product-category';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule,

    LanguageButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() categoryResult: CategoryResult[] | undefined = [];
  @Input() productCategories: ProductCategoryResult[] | undefined = [];
  @Input() cartCount: number = 0;
  @Input() cartTotal: number = 0;

  isMobile = false;
  menuOpen = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    // this.breakpointObserver.observe([Breakpoints.Handset])
    //   .subscribe(result => this.isMobile = result.matches);

    this.breakpointObserver
      .observe(['(max-width: 479px)'])
      .subscribe((screenSize) => {
        if (screenSize.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  goToproduct(categoryId: string, subId: string) {
    // هنا ضيف منطق التنقل أو استدعاء Router.navigate
    console.log('Navigating to product', categoryId, subId);
  }
}

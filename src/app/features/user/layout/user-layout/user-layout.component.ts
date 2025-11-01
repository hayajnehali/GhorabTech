import { Component, inject, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { OperationResultGeneric } from '@core/base/operation-result';
import { phoneNumber } from '@core/model/social.config';
import { CategoryFilter, CategoryResult } from '@models/category';
import {
  ProductCategory,
  ProductCategoryResult,
} from '@models/product-category';
import { BaseLayOutComponent } from '@shared/component/base-lay-out/base-lay-out.component';
import { CategoryService } from '@shared/services/category.service';
@Component({
    selector: 'app-user-layout',
    templateUrl: './user-layout.component.html',
    styleUrl: './user-layout.component.scss',
    standalone: false
})
export class UserLayOutComponent extends BaseLayOutComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;
  isActive: boolean = false;
  openSide: boolean = false;
  categoryService = inject(CategoryService);
  categoryResult: CategoryResult[] | undefined = [];
  productCategories: ProductCategoryResult[] | undefined = [];
  constructor() {
    super();
  }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
    this.isAuthenticated = this.authService.isAuthenticated();
    this.getProductCategoryWithProduct();
  }
  getProductCategoryWithProduct() {
    this.categoryService
      .getProductCategoryWithProduct(new CategoryFilter())
      .subscribe({
        next: (res: OperationResultGeneric<CategoryResult[]>) => {
          this.categoryResult = res.data;
          this.productCategories =
            res.data?.flatMap((item) => item.productCategories) ?? undefined;
        },
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
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem(this.language, language);
    this.router.navigate([this.router.url]).then(() => {
      window.location.reload();
    });
  }

  goProductS() {
    this.router.navigate(['user/product']);
  }
  gocategory() {
    this.router.navigate(['admin/categorys']);
  }
  goToproduct(arg0: string | undefined, arg1: string | undefined) {
      this.router.navigate([`category/${arg0}/product-category/${arg1}/product`],{ relativeTo: this.activatedRoute });
  }
  toggleActive(): void {
    this.isActive = !this.isActive;
  }
  logout() {
    this.authService.logout();
  }
  openWhatsApp(): void { 
  const message = encodeURIComponent('مرحبًا، أود الاستفسار عن منتج');
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

}

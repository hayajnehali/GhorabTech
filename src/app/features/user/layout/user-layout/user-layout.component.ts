import { Component, inject, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { OperationResultGeneric } from '@core/base/operation-result';
import { phoneNumber } from '@core/model/social.config';
import { CategoryFilter, CategoryResult } from '@models/category';
import {
  ProductCategory,
  ProductCategoryResult,
} from '@models/product-category';
import { TranslateModule } from '@ngx-translate/core';
import { BaseLayOutComponent } from '@shared/component/base-lay-out/base-lay-out.component';
import { CartService } from '@shared/services/cart.service';
import { CategoryService } from '@shared/services/category.service';
import { ResponsiveService } from '@shared/services/responsive.service';
import { SpinnerService } from '@shared/services/spinner.service';
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
  standalone: false,
})
export class UserLayOutComponent extends BaseLayOutComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;
  isActive: boolean = false; 
  categoryService = inject(CategoryService);
  cartService = inject(CartService);
  responsiveService = inject(ResponsiveService);
  categoryResult: CategoryResult[] | undefined = [];
  productCategories: ProductCategoryResult[] | undefined = [];
  cartCount = 0;
  cartTotal = 0;
  spinnerService = inject(SpinnerService);
  constructor() {
    super();
  }

  ngOnInit() {
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart.cartItems.length;
    });
    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total;
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
      this.isCollapsed = false;  
    } else {
      this.sidenav.open(); 
      this.isCollapsed = !this.isCollapsed;
    }
  }

  goProductS() {
    this.router.navigate(['user/product']);
  }
  gocategory() {
    this.router.navigate(['admin/categorys']);
  }
  goToproduct(arg0: string | undefined, arg1: string | undefined) {
    this.router.navigate(
      [`category/${arg0}/product-category/${arg1}/product`],
      { relativeTo: this.activatedRoute }
    );
  }
  toggleActive(): void {
    this.isActive = !this.isActive;
  }

  openWhatsApp(): void {
    const message = encodeURIComponent('مرحبًا، أود الاستفسار عن منتج');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
}

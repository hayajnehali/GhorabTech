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
  openSide: boolean = false;
  categoryService = inject(CategoryService);
  cartService = inject(CartService);
  categoryResult: CategoryResult[] | undefined = [];
  productCategories: ProductCategoryResult[] | undefined = [];
  cartCount = 0;
  cartTotal = 0;
  nameOfProduct: string='';
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
    this.observer.observe(['(max-width: 766px)']).subscribe((screenSize) => {
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

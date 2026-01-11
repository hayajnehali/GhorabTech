import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@core/base/base-component';
import { CartItem } from '@models/cart-item';
import { KeyAttribute, KeyAttributeResult } from '@models/key-attribute';
import { KeyAttributeValueResult } from '@models/key-attribute-value';
import { ProductResult } from '@models/product';
import { TranslateService } from '@ngx-translate/core';
import { LoginLogoutDialogComponent } from '@shared/dialog/login-logout-dialog/login-logout-dialog.component';
import { CartService } from '@shared/services/cart.service';
import { NotificationService } from '@shared/services/notification.service';
import { ProductService } from '@shared/services/product.service';
import { SpinnerService } from '@shared/services/spinner.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
  standalone: false,
})
export class ProductViewComponent extends BaseComponent implements OnInit {
  product: ProductResult = new ProductResult();
  cartService = inject(CartService);
  spinnerService = inject(SpinnerService);
  keyAttributes: KeyAttributeResult[] = [];
  item: CartItem = new CartItem();
  id: string | null = null;
  currentRating = 0;
  stars = [1, 2, 3, 4, 5];
  constructor(private productService: ProductService) {
    super();
  }

  ngOnInit(): void {
    this.getProductById();
  }
  getProductById() {
    this.id = this.activatedRoute.snapshot.paramMap.get('productId');
    if (this.id != null)
      this.productService.getById(this.id).subscribe((req) => {
        if (req.data) {
          this.product = req.data!;
          this.getKeyAttribute();
        }
      });
  }

  getKeyAttribute() {
    if (this.product.keyAttributeValues) {
      this.product.keyAttributeValues.forEach((element) => {
        if (!this.keyAttributes.find((x) => x.id == element.keyAttribute.id)) {
          this.keyAttributes.push(element.keyAttribute);
        }
        if (
          !this.keyAttributes.find((x) => x.id == element.keyAttribute.id)
            ?.keyAttributeValues
        ) {
          this.keyAttributes.find(
            (x) => x.id == element.keyAttribute.id
          )!.keyAttributeValues = [];
        }
        this.keyAttributes
          .find((x) => x.id == element.keyAttribute.id)
          ?.keyAttributeValues?.push(element);
      });
    }
  }

  selectOption(attr: KeyAttributeResult, value: KeyAttributeValueResult) {
    // console.log('Selected:', attr, value);
  }

  increment() {
    this.item.quantity++;
  }

  decrement() {
    if (this.item.quantity > 1) {
      this.item.quantity--;
    }
  }

  addToCart() {
    this.addAttributeSelected();
    if (
      !this.item.keyAttributeValues ||
      this.item.keyAttributeValues.length < this.keyAttributes.length
    ) {
      this.notificationService.showWarning(
        this.translate.instant('general.select-all-attributes'),
        this.translate.instant('general.error')
      );
      return;
    }
    this.item.product.id = this.product.id;
    this.item.product.name = this.product.name;
    this.item.product.price = this.product.price;
    this.item.product.images = this.product.images;

    this.cartService.addItem(this.item);
    this.notificationService.showSuccess(
      this.translate.instant('cart.add-to-cart'),
      this.translate.instant('general.success')
    );
    this.item = new CartItem();
    this.spinnerService.openSideCart();
  }

  addAttributeSelected() {
    for (let att of this.keyAttributes) {
      let value = att.keyAttributeValues.find((x) => x.iselected);
      if (value) {
        let newVal = new KeyAttributeValueResult();
        newVal.id = value.id;
        newVal.value = value.value;
        this.item.keyAttributeValues.push(newVal);
        value.iselected = false;
      }
    }
  }
  onAttributeSelected(attr: KeyAttributeResult, val: KeyAttributeValueResult) {
    val.iselected = true;
    attr.keyAttributeValues
      .filter((x) => x.id !== val.id)
      .forEach((element) => {
        element.iselected = false;
      });
  }

  rate(stars: number) {
    this.authService.runWithAuth(() => {
      this.submitRating(stars);
    });
  }

  private submitRating(stars: number) {
    this.currentRating = stars;
    this.productService.addOrUpdateRating(this.id!, stars).subscribe({
      next: (res) => {
        this.product.averageRating = res.data ?? 0;
      },
      error: (err) => console.error('Rating failed', err),
    });
  }
}

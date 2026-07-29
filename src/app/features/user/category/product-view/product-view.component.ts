import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base/base-component';
import { CartItem } from '@models/cart-item';
import { ProductResult } from '@models/product';
import { ProductVariantResult } from '@models/product-variant';
import { CartService } from '@shared/services/cart.service';
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
  selectedVariant: ProductVariantResult | null = null;
  item: CartItem = new CartItem();
  id: string | null = null;
  currentRating = 0;
  stars = [1, 2, 3, 4, 5];

  constructor(readonly productService: ProductService) {
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
          if (this.product.variants && this.product.variants.length > 0) {
            this.selectVariant(this.product.variants[0]);
          }
        }
      });
  }

  selectVariant(variant: ProductVariantResult) {
    this.selectedVariant = variant;
  }

  increment() {
    if (
      this.selectedVariant &&
      this.item.quantity < this.selectedVariant.availableStock
    ) {
      this.item.quantity++;
    }
  }

  decrement() {
    if (this.item.quantity > 1) {
      this.item.quantity--;
    }
  }

  addToCart() {
    if (!this.selectedVariant) {
      this.notificationService.showWarning(
        this.translate.instant('general.select-variant'),
        this.translate.instant('general.error')
      );
      return;
    }

    if (this.selectedVariant.availableStock <= 0) {
      this.notificationService.showWarning(
        this.translate.instant('general.out-of-stock'),
        this.translate.instant('general.error')
      );
      return;
    }

    this.item.product.id = this.product.id;
    this.item.product.name = this.product.name;
    this.item.product.images = this.product.images;
    this.item.productVariantId = this.selectedVariant.id!;
    this.item.productVariant = this.selectedVariant;

    this.cartService.addItem(this.item);
    this.notificationService.showSuccess(
      this.translate.instant('cart.add-to-cart'),
      this.translate.instant('general.success')
    );
    this.item = new CartItem();
    this.spinnerService.openSideCart();
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

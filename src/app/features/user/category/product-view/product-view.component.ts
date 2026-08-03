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
  attributeGroups: AttributeGroup[] = [];
  selectedByGroup: Map<string, string> = new Map();

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
            this.buildAttributeGroups();
            this.selectVariant(this.product.variants[0]);
            this.preselectFirstVariant();
          }
        }
      });
  }

  buildAttributeGroups(): void {
    const groups = new Map<string, AttributeGroup>();
    for (const variant of this.product.variants ?? []) {
      for (const attr of variant.attributes ?? []) {
        const groupId = attr.keyAttributeId ?? attr.keyAttributeValueId;
        const name = attr.keyAttributeName?.local ?? '';
        const value = attr.value?.local ?? '';
        if (!groupId || !value) continue;

        if (!groups.has(groupId)) {
          groups.set(groupId, { keyAttributeId: groupId, name, values: [] });
        }
        const group = groups.get(groupId)!;
        if (!group.values.some((v) => v.value === value)) {
          group.values.push({ value, available: variant.availableStock > 0 });
        }
      }
    }
    this.attributeGroups = [...groups.values()];
  }

  selectAttributeValue(groupId: string, value: string): void {
    if (this.selectedByGroup.get(groupId) === value) {
      this.selectedByGroup.delete(groupId);
    } else {
      this.selectedByGroup.set(groupId, value);
    }
    this.resolveVariant();
  }

  resolveVariant(): void {
    if (this.attributeGroups.length === 0) return;
    if (this.selectedByGroup.size !== this.attributeGroups.length) {
      this.selectedVariant = null;
      return;
    }
    const match = (this.product.variants ?? []).find((variant) =>
      (variant.attributes ?? []).every((attr) => {
        const groupId = attr.keyAttributeId ?? attr.keyAttributeValueId;
        return this.selectedByGroup.get(groupId) === (attr.value?.local ?? '');
      })
    );
    this.selectedVariant = match ?? null;
  }

  preselectFirstVariant(): void {
    const first = this.product.variants?.[0];
    if (!first) return;
    this.selectedByGroup.clear();
    for (const attr of first.attributes ?? []) {
      const groupId = attr.keyAttributeId ?? attr.keyAttributeValueId;
      if (groupId && attr.value?.local) {
        this.selectedByGroup.set(groupId, attr.value.local);
      }
    }
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

export interface AttributeGroup {
  keyAttributeId: string;
  name: string;
  values: AttributeValueOption[];
}

export interface AttributeValueOption {
  value: string;
  available: boolean;
}

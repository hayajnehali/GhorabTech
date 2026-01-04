import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { OperationResultGeneric } from '@core/base/operation-result';
import { Cart, CartResult } from '@models/cart';
import { CartItem, CartItemFilter, CartItemResult } from '@models/cart-item';
import { CartItemService } from '@shared/services/cart-item.service';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-cart-item-list',
  standalone: false,
  templateUrl: './cart-item-list.component.html',
  styleUrl: './cart-item-list.component.scss',
})
export class CartItemListComponent extends BaseListComponent<
  CartItem,
  CartItemResult,
  CartItemFilter
> {
  paymentStatus: string[] = [];
  cartService = inject(CartService);
  loadingCart = true;
  constructor(
    private cartItemService: CartItemService,
    public dialogRef: MatDialogRef<CartItemListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cartId: string }
  ) {
    super(cartItemService, CartItemFilter);
    this.activatedRoute.params.subscribe((params) => {
      this.filter.cartId = data.cartId ?? null;
    });

    this.displayedColumns = [
      'img',
      'product-name',
      'details',
      'quantity',
      'unitPrice',
      'total',
      //      'action'
    ];
  }

 override   loadData(): void {
    this.loading = false;
    const sub = this.cartItemService.getAll(this.filter).subscribe({
      next: (data) => {
        if (data.data) this.dataSource.data = data.data;
        this.totalNumberOf = data.totalNumberOf;
        this.loading = true;
      },
      complete: () => {
        this.processAfterComplete();
      },
      error: (err) => {},
    });
    this.subscribe(sub);
  }
}

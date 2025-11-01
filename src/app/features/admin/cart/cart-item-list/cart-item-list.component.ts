import { Component, inject } from '@angular/core';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { Cart, CartFilter, CartResult } from '@models/cart';
import { CartItem, CartItemFilter, CartItemResult } from '@models/cart-item';
import { OrderExitStatus } from '@shared/Enum/cart-enum';
import { CartItemService } from '@shared/services/cart-item.service';
import { CartService } from '@shared/services/cart.service';
import { CartModule } from '../cart.module';
import { OperationResultGeneric } from '@core/base/operation-result';
import { find } from 'rxjs';
import { getEnumList } from '@shared/Enum/enum-list';

@Component({
    selector: 'app-cart-item-list',
    templateUrl: './cart-item-list.component.html',
    styleUrl: './cart-item-list.component.scss',
    standalone: false
})
export class CartItemListComponent extends BaseListComponent<
  CartItem,
  CartItemResult,
  CartItemFilter
> {
  paymentStatus: string[] = [];
  cart: Cart = new Cart();
  cartService = inject(CartService);
  orderExitStatus: { id: any; name: string }[];
  loadingCart = true;
  constructor(private cartItemService: CartItemService) {
    super(cartItemService, CartItemFilter);
    this.activatedRoute.params.subscribe((params) => {
      this.filter.cartId =
        this.activatedRoute.snapshot.paramMap.get('id') ?? null;
      this.cart.id = this.filter.cartId!;
      this.getCartById();
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
    this.orderExitStatus = getEnumList(OrderExitStatus);
  }
  saveOrderExitStatusOfCart() {
    this.cartService
      .changeOrderExitStatusOfCart(this.cart.id!, this.cart.orderExitStatus!)
      .subscribe({
        next: (res: OperationResultGeneric<CartResult>) => {
          if (res.success && res.data) {
            this.cart.orderExitStatus = res.data?.orderExitStatus;
          }
        },
        complete: () => {
          this.notificationService.showSuccess(
            this.translate.instant('general.success-message'),
            this.translate.instant('general.success')
          );
        },
        error: (err: any) => {
          this.notificationService.showError(err);
        },
      });
  }
  getCartById() {
    this.loadingCart = true;
    this.cartService.getById(this.cart.id!).subscribe({
      next: (res: OperationResultGeneric<CartResult>) => {
        if (res.success && res.data) {
          Object.assign(this.cart, res.data);
        }
      },
      complete: () => {
        this.loadingCart = false;
      },
      error: (err: any) => {
        this.notificationService.showError(err);
      },
    });
  }
}

// cartItemId?: number;
// quantity: number = 0;
// product: ProductResult = new ProductResult();
// total: number=0

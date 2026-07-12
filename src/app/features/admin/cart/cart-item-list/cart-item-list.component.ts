import { Component, inject } from '@angular/core';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { Cart, CartResult } from '@models/cart';
import { CartItem, CartItemFilter, CartItemResult } from '@models/cart-item';
import { OrderExitStatus } from '@shared/Enum/cart-enum';
import { CartItemService } from '@shared/services/cart-item.service';
import { CartService } from '@shared/services/cart.service';
import { getEnumList } from '@shared/Enum/enum-list';
import { Result } from '@models/results/result';

@Component({
  selector: 'app-cart-item-list',
  templateUrl: './cart-item-list.component.html',
  styleUrl: './cart-item-list.component.scss',
  standalone: false,
})
export class CartItemListComponent extends BaseListComponent<
  CartItem,
  CartItemResult,
  CartItemFilter
> {
  cart: Cart = new Cart();
  cartService = inject(CartService);
  orderExitStatus: { id: any; name: string }[];
  loadingCart = true;

  constructor(private cartItemService: CartItemService) {
    super(cartItemService, CartItemFilter);
    this.activatedRoute.params.subscribe(() => {
      this.filter.cartId =
        this.activatedRoute.snapshot.paramMap.get('id') ?? null;
      this.cart.id = this.filter.cartId!;
      this.getCartById();
    });
    this.orderExitStatus = getEnumList(OrderExitStatus);
  }

  saveOrderExitStatusOfCart() {
    this.cartService
      .changeOrderExitStatusOfCart(this.cart.id!, this.cart.orderExitStatus!)
      .subscribe({
        next: (res: Result<CartResult>) => {
          if (res.isSuccess && res.data) {
            this.cart.orderExitStatus = res.data.orderExitStatus;
          }
        },
        complete: () => {
          this.notificationService.showSuccess(
            this.translate.instant('general.success-message'),
            this.translate.instant('general.success'),
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
      next: (res: Result<CartResult>) => {
        if (res.isSuccess && res.data) {
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

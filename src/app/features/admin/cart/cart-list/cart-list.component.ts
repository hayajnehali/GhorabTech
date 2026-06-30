import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { Cart, CartFilter, CartResult } from '@models/cart';
import {
  CartStatus,
  OrderExitStatus,
  PaymentMethod,
} from '@shared/Enum/cart-enum';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss',
  standalone: false,
})
export class CartListComponent extends BaseListComponent<
  Cart,
  CartResult,
  CartFilter
> {
  paymentStatus: string[] = [];
  orderExitStatus: string[] = [];
  form: FormGroup = this.fb.group({
    searchText: [null],
    paymentStatus: [null],
    orderExitStatus: [null],
  });

  constructor(private cartService: CartService) {
    super(cartService, CartFilter);

    this.paymentStatus = Object.keys(CartStatus).filter((key) =>
      isNaN(Number(key)),
    );
    this.orderExitStatus = Object.keys(OrderExitStatus).filter((key) =>
      isNaN(Number(key)),
    );
  }

  navigateToCartItems(id: string): void {
    this.router.navigate([id, 'cart-item-list'], {
      relativeTo: this.activatedRoute,
    });
  }

  deleteCart(data: CartResult): void {
    if (
      !confirm(
        this.translate.instant('general.confirm-delete') ||
          'Are you sure you want to delete this cart?',
      )
    ) {
      return;
    }
    this.cartService.delete(data.id!).subscribe({
      next: () => {
        this.notificationService.showSuccess(
          this.translate.instant('general.success-message'),
          this.translate.instant('general.success'),
        );
        this.search();
      },
      error: (err) => this.notificationService.showError(err),
    });
  }

  getCartStatusName(status: number): string {
    return CartStatus[status];
  }

  getorderExitStatus(status: number): string {
    return OrderExitStatus[status];
  }

  getPaymentMethodStatus(status: number): string {
    return PaymentMethod[status];
  }
}

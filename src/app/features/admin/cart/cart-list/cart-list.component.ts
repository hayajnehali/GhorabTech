import { Component } from '@angular/core';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { Cart, CartFilter, CartResult } from '@models/cart';
import { CartStatus, OrderExitStatus, PaymentMethod } from '@shared/Enum/cart-enum';
import { CartService } from '@shared/services/cart.service';

@Component({
    selector: 'app-cart-list',
    templateUrl: './cart-list.component.html',
    styleUrl: './cart-list.component.scss',
    standalone: false
})
export class CartListComponent extends BaseListComponent<
  Cart,
  CartResult,
  CartFilter
> {
  paymentStatus :string[]= [];
  orderExitStatus: string[]=[];
  constructor(private cartService: CartService) {
    super(cartService, CartFilter);
    
    this.displayedColumns = [
      'id',
      'email',
      'payment-method',
      'payment-status',
      'order-exit-status',
      'createDate',
      'action',
    ];

     this.paymentStatus = Object.keys(CartStatus).filter(
      (key) => isNaN(Number(key))
    );
     this.orderExitStatus = Object.keys(OrderExitStatus).filter(
      (key) => isNaN(Number(key))
    );
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

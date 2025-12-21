import { Component } from '@angular/core';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { Cart, CartFilter, CartResult } from '@models/cart';
import {
  CartStatus,
  OrderExitStatus,
  PaymentMethod,
} from '@shared/Enum/cart-enum';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-my-cart-list',
  standalone: false,
  templateUrl: './my-cart-list.component.html',
  styleUrl: './my-cart-list.component.scss',
})
export class MyCartListComponent extends BaseListComponent<
  Cart,
  CartResult,
  CartFilter
> {
  paymentStatus: string[] = [];
  orderExitStatus: string[] = [];
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

    this.paymentStatus = Object.keys(CartStatus).filter((key) =>
      isNaN(Number(key))
    );
    this.orderExitStatus = Object.keys(OrderExitStatus).filter((key) =>
      isNaN(Number(key))
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

  override loadData(): void { 
    const sub = this.cartService.getCartsByUser(this.filter).subscribe({
      next: (data) => {
        if (data.data) this.dataSource.data = data.data;
        this.totalNumberOf = data.totalNumberOf; 
      },
      complete: () => { 
      },
      error: (err) => {console.log(err); },
    });
    this.subscribe(sub);
  }
}

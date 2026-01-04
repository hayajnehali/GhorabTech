import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { Cart, CartFilter, CartResult } from '@models/cart';
import {
  CartStatus,
  OrderExitStatus,
  PaymentMethod,
} from '@shared/Enum/cart-enum';
import { AuthService } from '@shared/services/auth.service';
import { CartService } from '@shared/services/cart.service';
import { CartItemListComponent } from '../cart-item-list/cart-item-list.component';

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
  authService = inject(AuthService);
  constructor(private cartService: CartService,private dialog: MatDialog) {
    super(cartService, CartFilter);

    this.displayedColumns = [
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
    openCartItems(id: string) {
    if (!this.authService.isAuthenticatedSignal()) {
      this.router.navigate(['/user']);
    } else {
      const dialogRef = this.dialog.open(CartItemListComponent, {
        width: '80%',
        data: { cartId: id },
        panelClass: 'custom-dialog',
      });
    }
  }

}

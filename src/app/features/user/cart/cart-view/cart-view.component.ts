import { Component, inject, OnInit } from '@angular/core';
import { Cart, CartOwner } from '@models/cart';
import { CartItem } from '@models/cart-item';
import { CartService } from '@shared/services/cart.service';
import { BaseComponent } from '@core/base/base-component';
import { PayWay, RegistrationWay } from '@shared/Enum/pay-way';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.scss',
  standalone: false,
})
export class CartViewComponent extends BaseComponent implements OnInit {
  cartService = inject(CartService);
  cart: Cart = new Cart();
  total: number = 0;
  payway: any = PayWay;
  entity: any;
  registrationWay: any = RegistrationWay;
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
      this.cart.cartowner = new CartOwner();
    });
    this.cartService.cartTotal$.subscribe((total) => {
      this.total = total;
    });
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.decreaseQuantity(item);
  }
  increaseQuantity(item: CartItem): void {
    this.cartService.increaseQuantity(item);
  }
  openLogInLogoutDialog() {
    this.authService.runWithAuth(() => {
      this.router.navigate(['/user/pay']);
    });
  }

  goToMyCrts() {
    this.authService.runWithAuth(() => {
      this.router.navigate(['user', 'my-cart']);
    });
  }
  save(_t8: NgForm) {
    throw new Error('Method not implemented.');
  }
}

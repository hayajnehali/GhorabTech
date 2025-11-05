import { Component, inject, OnInit } from '@angular/core';
import { Cart } from '@models/cart';
import { CartItem } from '@models/cart-item';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-card-sidenav',
  templateUrl: './card-sidenav.component.html',
  styleUrl: './card-sidenav.component.scss',
  standalone: false,
})
export class CardSidenavComponent implements OnInit {
  cartService = inject(CartService);
  cart: Cart = new Cart();
  total: number = 0;

  ngOnInit(): void {
    this.cartService.initCart();
    this.cartService.cartTotal$.subscribe((count) => {
      this.total = count;
    });
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
    }); 
  }
 

  decreaseQuantity(item: CartItem): void {
     this.cartService.decreaseQuantity(item);
    this.cart = this.cartService.getCart();
  }
  increaseQuantity(item: CartItem ): void {
    this.cartService.increaseQuantity(item);
    this.cart = this.cartService.getCart();
  } 

  clear() {
    this.cartService.clearCart();
    this.cart = this.cartService.getCart();
  } 

  removeItem(arg0: string) {
    this.cartService.removeItem(arg0);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Cart } from '@models/cart';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-card-sidenav',
  templateUrl: './card-sidenav.component.html',
  styleUrl: './card-sidenav.component.scss',
})
export class CardSidenavComponent implements OnInit {
  cartService = inject(CartService);
  cart: Cart = new Cart();

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  updateQuantity(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
    this.cart = this.cartService.getCart();
  }

  clear() {
    this.cartService.clearCart();
    this.cart = this.cartService.getCart();
  }
}

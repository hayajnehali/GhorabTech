import { Component, inject, OnInit } from '@angular/core';
import { Cart } from '@models/cart';
import { CartService } from '@shared/services/cart.service';

@Component({
    selector: 'app-card-sidenav',
    templateUrl: './card-sidenav.component.html',
    styleUrl: './card-sidenav.component.scss',
    standalone: false
})
export class CardSidenavComponent implements OnInit {
  cartService = inject(CartService);
  cart: Cart = new Cart();
  total: number = 0;

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.getTotal();
  }

  updateQuantity(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
    this.cart = this.cartService.getCart();
  }

  clear() {
    this.cartService.clearCart();
    this.cart = this.cartService.getCart();
  }

  getTotal() {
    this.total = this.cartService.getTotal();
  }

  removeItem(arg0: string) {
    this.cartService.removeItem(arg0);
  }
}

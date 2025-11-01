import { Component, inject, OnInit } from '@angular/core';
import { Cart } from '@models/cart';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.scss',
})
export class CartViewComponent implements OnInit {
  cartService = inject(CartService);
  cart: Cart = new Cart();

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  updateQuantity(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
    this.cart = this.cartService.getCart();
  }


}

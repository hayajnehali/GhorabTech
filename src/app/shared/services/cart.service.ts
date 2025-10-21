// cart.service.ts
import { Injectable } from '@angular/core';
import { environment } from '@shared/environment/environment';
import { LocalStorageService } from './local-storage-service.service';
import { Cart, CartFilter, CartResult } from '@models/cart';
import { CartItem } from '@models/cart-item';
import { ServiceBase } from './base.service';
import { HttpClient } from '@angular/common/http';
import { apiName } from '@shared/Enum/api-name';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService extends ServiceBase<Cart, CartResult, CartFilter> {
  private readonly CART_KEY = environment.CART_KEY;
  constructor(private storage: LocalStorageService, http: HttpClient) {
    super(http, apiName.cart);
  }

  getCart(): Cart {
    const cart = this.storage.get<Cart>(this.CART_KEY);
    if (cart) {
      return cart;
    } 
    const newCart: Cart = new Cart();
    newCart.id= this.generateCartId();
    this.storage.set(this.CART_KEY, newCart);
    return newCart;
  }

  saveCart(cart: Cart): void {
    cart.updateStamp = new Date();
    this.storage.set(this.CART_KEY, cart);
  }

  addItem(item: CartItem): void {
    const cart = this.getCart();
    const found = cart.cartItems.find((i) => i.id === item.product.id);
    if (found) {
      found.quantity += item.quantity;
    } else {
      cart.cartItems.push(item);
    }
    this.saveCart(cart);
  }

  updateQuantity(productId: string, quantity: number): void {
    const cart = this.getCart();
    const found = cart.cartItems.find((i) => i.product.id === productId);
    if (found) {
      found.quantity = quantity;
      if (found.quantity <= 0) {
        cart.cartItems = cart.cartItems.filter((i) => i.id !== productId);
      }
    }
    this.saveCart(cart);
  }

  removeItem(productId: string): void {
    const cart = this.getCart();
    cart.cartItems = cart.cartItems.filter((i) => i.id !== productId);
    this.saveCart(cart);
  }

  clearCart(): void {
    this.storage.remove(this.CART_KEY);
  }

  getTotal(): number {
    const cart = this.getCart();
    return cart.cartItems.reduce((sum, i) => {
      return sum + (i.product.price ?? 0) * i.quantity;
    }, 0);
  }

  private generateCartId(): string {
    return crypto.randomUUID();
  }

 
}

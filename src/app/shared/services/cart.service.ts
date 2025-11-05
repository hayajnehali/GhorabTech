import { Injectable, OnInit } from '@angular/core';
import { environment } from '@shared/environment/environment';
import { LocalStorageService } from './local-storage-service.service';
import { Cart, CartFilter, CartResult } from '@models/cart';
import { CartItem } from '@models/cart-item';
import { ServiceBase } from './base.service';
import { HttpClient } from '@angular/common/http';
import { apiName } from '@shared/Enum/api-name';
import { BehaviorSubject, Observable } from 'rxjs';
import { OperationResultGeneric } from '@core/base/operation-result';
import { OrderExitStatus } from '@shared/Enum/cart-enum';
import { KeyAttributeValue } from '@models/key-attribute-value';

@Injectable({
  providedIn: 'root',
})
export class CartService extends ServiceBase<Cart, CartResult, CartFilter> {
  private readonly CART_KEY = environment.CART_KEY;
  private cartTotal = new BehaviorSubject<number>(0);
  cartTotal$ = this.cartTotal.asObservable();

  private cartSubject = new BehaviorSubject<Cart>(new Cart());
  cart$ = this.cartSubject.asObservable();

  constructor(private storage: LocalStorageService, http: HttpClient) {
    super(http, apiName.cart);
  }
  initCart(): void {
    this.getTotal();
  }

  getCart(): Cart {
    const cart = this.storage.get<Cart>(this.CART_KEY);
    if (cart) {
      this.saveCart(cart);
      return cart;
    }
    const newCart: Cart = new Cart();
    newCart.id = this.generateCartId();
    this.saveCart(newCart);
    return newCart;
  }

  saveCart(cart: Cart): void {
    cart.updateStamp = new Date();
    this.storage.set(this.CART_KEY, cart);
    let total = this.calculationTotal(cart);
  }

  addItem(item: CartItem): void {
    let cart = this.getCart();
    let found = cart.cartItems.find(
      (i) =>
        i.product.id === item.product.id &&
        this.hasSameKeyAttributes(i.keyAttributeValues, item.keyAttributeValues)
    );

    if (found) {
      found.quantity += item.quantity;
    } else {
      if (!cart.cartItems) {
        cart.cartItems = [];
      }
      cart.cartItems.push(item);
    }
    this.saveCart(cart);
  }

  decreaseQuantity(item: CartItem): void {
    this.updateQuantity(item, -1);
  }
  increaseQuantity(item: CartItem): void {
    this.updateQuantity(item, +1);
  }
  private updateQuantity(item: CartItem, op: number): void {
    const cart = this.getCart();
    let found = cart.cartItems.find(
      (i) =>
        i.product.id === item.product.id &&
        this.hasSameKeyAttributes(i.keyAttributeValues, item.keyAttributeValues)
    );
    if (found) {
      found.quantity = found.quantity + op;
      if (found.quantity == 0) {
        cart.cartItems = cart.cartItems.filter(
          (i) =>
            i.id !== item.product.id &&
            !this.hasSameKeyAttributes(
              i.keyAttributeValues,
              item.keyAttributeValues
            )
        );
      }
      this.saveCart(cart);
    }
  }

  removeItem(productId: string): void {
    const cart = this.getCart();
    cart.cartItems = cart.cartItems.filter((i) => i.id !== productId);
    this.saveCart(cart);
  }

  clearCart(): void {
    this.cartSubject.next(new Cart());
    this.storage.remove(this.CART_KEY);
  }

  private getTotal(): number {
    const cart = this.getCart();
    let total = this.calculationTotal(cart);
    return total;
  }

  private calculationTotal(cart: Cart): number {
    let total = cart.cartItems.reduce((sum, i) => {
      return sum + (i.product.price ?? 0) * i.quantity;
    }, 0);
    this.cartTotal.next(total);
    this.cartSubject.next(cart); 
    return total;
  }

  private generateCartId(): string {
    return crypto.randomUUID();
  }

  changeOrderExitStatusOfCart(
    cartId: string,
    orderExitStatus: OrderExitStatus
  ): Observable<OperationResultGeneric<CartResult>> {
    return this.http.put<OperationResultGeneric<CartResult>>(
      `${this.baseUrl}/change-order-exit-status-cart/${cartId}?orderExitStatus=${orderExitStatus}`,
      {}
    );
  }

  private hasSameKeyAttributes(
    a: KeyAttributeValue[],
    b: KeyAttributeValue[]
  ): boolean {
    if (a.length !== b.length) return false;

    const aIds = a.map((k) => k.id).sort();
    const bIds = b.map((k) => k.id).sort();

    return aIds.every((id, index) => id === bIds[index]);
  }
}

import { Injectable } from '@angular/core';
import { environment } from '@shared/environment/environment';
import { LocalStorageService } from './local-storage-service.service';
import { Cart, CartFilter, CartResult } from '@models/cart';
import { CartItem } from '@models/cart-item';
import { ServiceBase } from './base.service';
import { HttpClient } from '@angular/common/http';
import { apiName } from '@shared/Enum/api-name';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartStatus, OrderExitStatus } from '@shared/Enum/cart-enum';
import { Result } from '@models/results/result';
import { PagedResult } from '@models/results/search-filter';

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
    this.calculationTotal(cart);
  }

  addItem(item: CartItem): void {
    const cart = this.getCart();
    const found = cart.cartItems.find(
      (i) => i.productVariantId === item.productVariantId
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
    const found = cart.cartItems.find(
      (i) => i.productVariantId === item.productVariantId
    );
    if (found) {
      found.quantity = found.quantity + op;
      if (found.quantity <= 0) {
        cart.cartItems = cart.cartItems.filter(
          (i) => i.productVariantId !== item.productVariantId
        );
      }
      this.saveCart(cart);
    }
  }

  removeItem(productVariantId: string): void {
    const cart = this.getCart();
    cart.cartItems = cart.cartItems.filter(
      (i) => i.productVariantId !== productVariantId
    );
    this.saveCart(cart);
  }

  clearCart(): void {
    this.cartSubject.next(new Cart());
    this.cartTotal.next(0);
    this.storage.remove(this.CART_KEY);
  }

  private getTotal(): number {
    const cart = this.getCart();
    return this.calculationTotal(cart);
  }

  private calculationTotal(cart: Cart): number {
    const total = cart.cartItems.reduce((sum, i) => {
      return sum + (i.productVariant?.price ?? 0) * i.quantity;
    }, 0);
    this.cartTotal.next(total);
    this.cartSubject.next(cart);
    return total;
  }

  private generateCartId(): string {
    return crypto.randomUUID();
  }

  changeCartStatuses(
    cartId: string,
    orderExitStatus: OrderExitStatus,
    paymentStatus: CartStatus
  ): Observable<Result<CartResult>> {
    return this.http.put<Result<CartResult>>(
      `${this.baseUrl}/change-cart-statuses/${cartId}?orderExitStatus=${orderExitStatus}&paymentStatus=${paymentStatus}`,
      {}
    );
  }

  gustCreateAndPay(item: Cart): Observable<Result<Cart>> {
    return this.http.post<Result<Cart>>(
      this.baseUrl + '/guest/create-and-pay',
      item
    );
  }
  createAndPay(item: Cart): Observable<Result<Cart>> {
    return this.http.post<Result<Cart>>(
      this.baseUrl + '/create-and-pay',
      item
    );
  }

  getCartsByUser(
    filterCriteria: CartFilter
  ): Observable<PagedResult<CartResult>> {
    const params = this.buildHttpParams(filterCriteria);

    return this.http.get<PagedResult<CartResult>>(
      this.baseUrl + '/get-cart-by-user',
      {
        params,
      }
    );
  }
}

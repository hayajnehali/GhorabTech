import { Injectable } from '@angular/core'; 
import { CartItem, CartItemFilter, CartItemResult } from '@models/cart-item';
import { ServiceBase } from './base.service';
import { HttpClient } from '@angular/common/http';
import { apiName } from '@shared/Enum/api-name';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartItemService extends ServiceBase<CartItem, CartItemResult, CartItemFilter> { 
  constructor(http: HttpClient) {
    super(http, apiName.cartItem);
  }
 
 
}

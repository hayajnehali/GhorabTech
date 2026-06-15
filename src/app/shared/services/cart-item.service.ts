import { Injectable } from '@angular/core'; 
import { CartItem, CartItemFilter, CartItemResult } from '@models/cart-item';
import { ServiceBase } from './base.service';
import { HttpClient } from '@angular/common/http';
import { apiName } from '@shared/Enum/api-name';
import { catchError, Observable, throwError } from 'rxjs';
import { ChartResult } from '@models/chart-result';
import { PagedResult } from '@models/results/search-filter';

@Injectable({
  providedIn: 'root',
})
export class CartItemService extends ServiceBase<CartItem, CartItemResult, CartItemFilter> { 
  constructor(http: HttpClient) {
    super(http, apiName.cartItem);
  }
 
 getSalesVolume(filterCriteria: CartItemFilter): Observable<PagedResult<ChartResult>> {
   const params = this.buildHttpParams(filterCriteria); 
   return this.http.get<PagedResult<ChartResult>>(this.baseUrl + '/sales-volume', { params });
 }
   getAllMyCartItem(filterCriteria: CartItemFilter): Observable<PagedResult<CartItemResult>> {
     const params = this.buildHttpParams(filterCriteria); 
     return this.http
       .get<PagedResult<CartItemResult>>(this.baseUrl + '/get-all-my-cart-item', {
         params,
       }) ;
       
   }
}

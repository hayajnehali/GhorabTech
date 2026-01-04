import { Injectable } from '@angular/core'; 
import { CartItem, CartItemFilter, CartItemResult } from '@models/cart-item';
import { ServiceBase } from './base.service';
import { HttpClient } from '@angular/common/http';
import { apiName } from '@shared/Enum/api-name';
import { catchError, Observable, throwError } from 'rxjs';
import { OperationResultGeneric } from '@core/base/operation-result';
import { ChartResult } from '@models/chart-result';

@Injectable({
  providedIn: 'root',
})
export class CartItemService extends ServiceBase<CartItem, CartItemResult, CartItemFilter> { 
  constructor(http: HttpClient) {
    super(http, apiName.cartItem);
  }
 
 getSalesVolume(filterCriteria: CartItemFilter): Observable<OperationResultGeneric<ChartResult[]>> {
   const params = this.buildHttpParams(filterCriteria); 
   return this.http.get<OperationResultGeneric<ChartResult[]>>(this.baseUrl + '/sales-volume', { params });
 }
   getAllMyCartItem(filterCriteria: CartItemFilter): Observable<OperationResultGeneric<CartItemResult[]>> {
     const params = this.buildHttpParams(filterCriteria); 
     return this.http
       .get<OperationResultGeneric<CartItemResult[]>>(this.baseUrl + '/get-all-my-cart-item', {
         params,
       }) ;
       
   }
}

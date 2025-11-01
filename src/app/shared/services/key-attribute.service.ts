import { Injectable } from '@angular/core';
import { ServiceBase } from './base.service';
import { ProductCategory, ProductCategoryFilter, ProductCategoryResult } from '../../model/product-category';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiName } from '../Enum/api-name';
import { catchError, Observable, throwError } from 'rxjs';
import { PaginatedResult } from '@models/paginated.result';
import { KeyAttribute, KeyAttributeFilter, KeyAttributeResult } from '@models/key-attribute';

@Injectable({
  providedIn: 'root'
})
export class KeyAttributeService extends ServiceBase<KeyAttribute,KeyAttributeResult,KeyAttributeFilter> { 

  constructor(http: HttpClient) {
    super(http, apiName.keyAttribute);
  }
 
  //  getProductCategoryWithProduct(filterCriteria: ProductCategoryFilter):Observable<ProductCategoryView>   {
  //   let params: HttpParams = this.buildHttpParams(filterCriteria);
  //   return this.http
  //     .get<ProductCategoryView>(this.baseUrl + '/get-products', { params })
  //     // .pipe(
  //     //   catchError((err) => {
  //     //     console.error('Error occurred:', err);
  //     //     return throwError(err);
  //     //   })
  //     // );
  // }
}
 
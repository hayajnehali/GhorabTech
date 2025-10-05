import { Injectable } from '@angular/core';
import { ServiceBase } from './base.service';
import { ProductCategory, ProductCategoryFilter, ProductCategoryResult } from '../../model/product-category';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiName } from '../Enum/api-name';
import { catchError, Observable, throwError } from 'rxjs';
import { PaginatedResult } from '@models/paginated.result';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService extends ServiceBase<ProductCategory,ProductCategoryResult,ProductCategoryFilter> { 

  constructor(http: HttpClient) {
    super(http, apiName.productICategory);
  }
 
   getProductCategoryWithProduct(filterCriteria: ProductCategoryFilter):Observable<ProductCategoryView>   {
    let params: HttpParams = this.filterParams(filterCriteria);
    return this.http
      .get<ProductCategoryView>(this.baseUrl + '/get-products', { params })
      // .pipe(
      //   catchError((err) => {
      //     console.error('Error occurred:', err);
      //     return throwError(err);
      //   })
      // );
  }
}

 export interface ProductCategoryView{
  totalNumberOf:number,
  data:ProductCategoryResult
}
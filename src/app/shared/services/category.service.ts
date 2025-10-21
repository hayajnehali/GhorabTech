import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiName } from '../Enum/api-name';
import { Observable } from 'rxjs';
import { ServiceBase } from './base.service';

import { Category, CategoryFilter, CategoryResult } from '@models/category';
import { OperationResultGeneric } from '@core/base/operation-result';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends ServiceBase<
  Category,
  CategoryResult,
  CategoryFilter
> {
  constructor(http: HttpClient) {
    super(http, apiName.category);
  }

  getProductCategoryWithProduct(
    filterCriteria: CategoryFilter
  ): Observable<OperationResultGeneric<CategoryResult[]>> {
    let params: HttpParams = this.buildHttpParams(filterCriteria);
    return this.http.get<OperationResultGeneric<CategoryResult[]>>(this.baseUrl + '/get-all-category-name', {
      params,
    });
  }
}

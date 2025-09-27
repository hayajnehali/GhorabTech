import { Injectable } from '@angular/core';
import { ServiceBase } from './base.service';
import { ProductCategory, ProductCategoryFilter, ProductCategoryResult } from '../../model/product-category';
import { HttpClient } from '@angular/common/http';
import { apiName } from '../Enum/api-name';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService extends ServiceBase<ProductCategory,ProductCategoryResult,ProductCategoryFilter> { 

  constructor(http: HttpClient) {
    super(http, apiName.productICategory);
  }
 
 
}

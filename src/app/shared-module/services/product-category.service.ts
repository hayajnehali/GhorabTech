import { Injectable } from '@angular/core';
import { GenericService } from './base.service';
import { ProductCategory, ProductCategoryFilter } from '../../model/product-category';
import { HttpClient } from '@angular/common/http';
import { apiName } from '../Enum/api-name';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService extends GenericService<ProductCategory,ProductCategoryFilter> { 

  constructor(http: HttpClient) {
    super(http, apiName.productICategory);
  }
 
 
}

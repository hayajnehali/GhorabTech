import { Injectable } from '@angular/core'; 
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { ServiceBase } from './base.service';
import { Product, ProductFilter, ProductResult } from '../../model/product';
import { apiName } from '../Enum/api-name';
@Injectable({
  providedIn: 'root'
})
 export class ProductService extends ServiceBase<Product,ProductResult,ProductFilter> { 

  constructor(http: HttpClient) {
    super(http, apiName.product);
  }
  
 

}
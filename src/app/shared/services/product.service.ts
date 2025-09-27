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
 

  
  // getAll(filterCriteria: any){
  //   let params = new HttpParams();
    
  //   // Assuming filterCriteria is an object with key-value pairs
  //   Object.keys(filterCriteria).forEach(key => {
  //     const value = filterCriteria[key];
      
  //     if (value !== undefined && value !== null) {
  //       params = params.append(key, String(value));  
  //     }
  //   });

  //   return this.http.get<any>("https://localhost:44360/api/Product/getAll", { params })
  // }
}
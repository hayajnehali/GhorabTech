import { Injectable } from '@angular/core';
import { environment } from '@shared/environment/environment';
import { LocalStorageService } from './local-storage-service.service';
import { Cart, CartFilter, CartResult } from '@models/cart'; 
import { ServiceBase } from './base.service';
import { HttpClient } from '@angular/common/http';
import { apiName } from '@shared/Enum/api-name';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService { 
    protected baseUrl: string = environment.apiUrl;
  
    constructor(protected http: HttpClient) {
      this.baseUrl = this.baseUrl + apiName.payment;
    }
 
  checkout(item: Cart): Observable<any> {  
    return this.http.post<any>(this.baseUrl + '/create-checkout-session', item);
  }
}

import { Injectable } from '@angular/core'; 
import { ServiceBase } from './base.service';
import { HttpClient } from '@angular/common/http';
import { apiName } from '@shared/Enum/api-name'; 
import { User, UserFilter, UserResult } from '@models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ServiceBase<User, UserResult, UserFilter> { 
  constructor(http: HttpClient) {
    super(http, apiName.user);
  } 
   override create(item: User): Observable<any> {
      return this.http.post<any>(this.baseUrl + '/create', item);
    }
    checkCode(item: User): Observable<any> {
      return this.http.post<any>(this.baseUrl + '/confirm-email', item);
    }
}

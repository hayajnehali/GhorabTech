import { Injectable } from '@angular/core';
import { ServiceBase } from './base.service'; 
import { HttpClient } from '@angular/common/http';
import { apiName } from '../Enum/api-name';
import { Category, CategoryFilter, CategoryResult } from '@models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ServiceBase<Category,CategoryResult,CategoryFilter> { 

  constructor(http: HttpClient) {
    super(http, apiName.category);
  }
 
 
}

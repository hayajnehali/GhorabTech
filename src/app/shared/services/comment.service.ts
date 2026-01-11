import { Injectable } from '@angular/core';
import { ServiceBase } from './base.service'; 
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiName } from '../Enum/api-name'; 
import { CommentFilter, CommentResult ,Comment} from '@models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends ServiceBase<Comment,CommentResult,CommentFilter> { 

  constructor(http: HttpClient) {
    super(http, apiName.Comment);
  }
 
 
}

  
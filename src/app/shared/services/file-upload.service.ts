import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  protected baseUrl:string=environment.apiUrl+"FileUpload"

  constructor(private http: HttpClient) {}

  uploadFile(formData:FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  protected baseUrl:string="https://localhost:44360/api/FileUpload"

  constructor(private http: HttpClient) {}

  uploadFile(formData:FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
    const language = localStorage.getItem('language') || 'en'; // Default to 'en' if not set

    // Clone the request to add the new header
    const clonedRequest = req.clone({
      setHeaders: {
        'Accept-Language': language // Add language to headers
      }
    });
    console.log(language)
    return next.handle(clonedRequest); // Pass the cloned request instead of the original request
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
   authService = inject(AuthService);
   token = this.authService.getToken();
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
    const language = localStorage.getItem('language') || 'en'; // Default to 'en' if not set

    // Clone the request to add the new header
    const clonedRequest = req.clone({
      setHeaders: {
         Authorization: `Bearer ${this.token}`,
        'Accept-Language': language // Add language to headers
      }
    }); 
    return next.handle(clonedRequest); // Pass the cloned request instead of the original request
  }
}

import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { SpinnerService } from '@shared/services/spinner.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  authService = inject(AuthService);
  spinnerService = inject(SpinnerService);
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const language = localStorage.getItem('language') || 'en'; // Default to 'en' if not set
    const token = this.authService.getToken();
    // Clone the request to add the new header
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': language, // Add language to headers
      },
    });
    this.spinnerService.show(); // يبدأ التحميل
    return next.handle(clonedRequest).pipe(
      finalize(() => this.spinnerService.hide()) // ينتهي التحميل عند انتهاء الطلب
    );
  }
}

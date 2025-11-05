import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

export const authChildGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = localStorage.getItem('token'); // مثال للتحقق من تسجيل الدخول

  if (token) {
    // if (authService.isAdmin()) {
    //   router.navigate(['/admin']); // يعيد توجيه المسؤول إلى لوحة التحكم
    // }else if (authService.isUser()) {
    //   router.navigate(['/user']); // يعيد توجيه المستخدم العادي إلى الصفحة الرئيسية
    // }
    return true; // يسمح بالدخول إلى كل المسارات الفرعية
  } else {
    router.navigate(['/user/login']); // يعيد توجيه المستخدم إذا غير مسموح له
    return false;
  }
};

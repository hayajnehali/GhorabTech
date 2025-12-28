import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

export const authChildGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = localStorage.getItem('token'); // مثال للتحقق من تسجيل الدخول

 


  const adminRoutes = state.url.startsWith('/admin'); // صفحات الإدارة
  const userProtectedRoutes = ['/user/', '/user/','/user/my-cart']; // صفحات المستخدم المحمية

  // إذا المستخدم يحاول دخول صفحة الإدارة بدون تسجيل دخول
  if (adminRoutes && !token) {
    router.navigate(['/user/login']);
    return false;
  }

  // إذا المستخدم عادي يحاول دخول صفحة محمية بدون تسجيل دخول
  if (userProtectedRoutes.includes(state.url) && !token) {
    router.navigate(['/user/login']);
    return false;
  }

  // منع الإدمن من دخول صفحات المستخدم العادي العامة أو المحمية
  if (token && authService.isAdmin() && state.url.startsWith('/user')) {
    router.navigate(['/admin/dashboard']);
    return false;
  }

  // السماح بالدخول في باقي الحالات (الصفحات العامة لأي شخص)
  return true;
};




 
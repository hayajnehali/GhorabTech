import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FormErrorComponent } from '@shared/component/form-error/form-error.component';
import { SharedModule } from '@shared/shared.module';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { BaseComponent } from '@core/base/base-component';
import { UserService } from '@shared/services/user.service';
import { User } from '@models/user';
import { Auth } from '@models/auth';
import { MatIcon } from '@angular/material/icon';
import { Result } from '@models/results/result';
import { DeliveryZoneService } from '@shared/services/delivery-zone.service';
import {
  DeliveryZoneFilter,
  DeliveryZoneResult,
} from '@models/delivery/delivery-zone';
import { SOCIAL_LINKS, SocialLink } from '@core/model/social.config';

@Component({
  selector: 'app-login-logout-dialog',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FormErrorComponent,
    MatDialogModule,
    MatIcon,
  ],
  templateUrl: './login-logout-dialog.component.html',
  styleUrl: './login-logout-dialog.component.scss',
})
export class LoginLogoutDialogComponent
  extends BaseComponent
  implements OnInit
{
  userService = inject(UserService);
  deliveryZoneService = inject(DeliveryZoneService);
  user: User = new User();
  deliveryZones: DeliveryZoneResult[] = [];
  loginError: string | null = null;
  auth: Auth = new Auth();
  confirmEmailForm: boolean = false;
  isLoginForm: boolean = true;
  hidePassword: any = true;
  loading: boolean | null = false;
  hideConfirmPassword: any = true;
  socialLinks = SOCIAL_LINKS;
  constructor(
    public dialogRef: MatDialogRef<LoginLogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { urlAfterLogin?: string; preventRedirect: boolean },
  ) {
    super();
  }
  ngOnInit(): void {
    this.loadDeliveryZones();
  }

  loadDeliveryZones() {
    let deliveryZoneFilter = new DeliveryZoneFilter();
    deliveryZoneFilter.pageSize = 0; // Set pageSize to 0 to fetch all delivery zones
    this.deliveryZoneService.getAll(deliveryZoneFilter).subscribe({
      next: (res) => {
        this.deliveryZones = res.items ?? [];
      },
    });
  }

  createUser(form: NgForm) {
    if (this.authService.isAuthenticatedSignal()) return;
    if (form.invalid || this.user.password !== this.user.confirmPassword) {
      form.control.markAllAsTouched();
      return;
    }
    this.userService.create(this.user).subscribe({
      next: (res: Result<User>) => {
        if (res.isSuccess && res.data) {
          this.auth.userName = this.user.userName;
          this.auth.password = this.user.password;
          this.confirmEmailForm = true;
        }
      },
      error: (err) => {
        this.notificationService.showError(err);
      },
    });
  }

  logIn(form: NgForm) {
    let resultData: Result<Auth>;
    if (this.authService.isAuthenticatedSignal()) return;
    this.loginError = null;
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.authService.login(this.auth).subscribe({
      next: (res:Result<Auth>) => {
        this.loading = false;
        resultData = res;
      },
      error: (err) => {
        this.loading = false;
        this.loginError = this.translate.instant('general.login-error');
      },
      complete: () => {
        this.loading = false;
        if (resultData.data?.isEmailConfirmed) {
          this.navigateBasedOnRole(resultData);
        } else {
          this.confirmEmailForm = true;
        }
      },
    });
  }

  close() {
    this.dialogRef.close();
  }

  setAuthForm(form: 'login' | 'register') {
    const targetIsLogin = form === 'login';
    if (targetIsLogin === this.isLoginForm) return;

    const leavingPanelId = this.isLoginForm ? 'login-panel' : 'register-panel';
    const leavingPanel = document.getElementById(leavingPanelId);
    leavingPanel?.classList.add('panel-leaving');

    setTimeout(() => {
      this.isLoginForm = targetIsLogin;
      leavingPanel?.classList.remove('panel-leaving');
    }, 450);
  }

  splitWords(text: string): string[] {
    return (text ?? '').trim().split(/\s+/);
  }

  checkVerification(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.userService.checkCode(this.auth).subscribe({
      next: (res: Result<Auth>) => {
        this.navigateBasedOnRole(res);
      },
      complete: () => {},
    });
  }

  navigateBasedOnRole(res: Result<Auth>) {
    // 1. حفظ التوكن أولاً وبشكل فوري
    this.authService.saveToken(res.data?.token ?? '');

    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin']);
      this.dialogRef.close(); // إغلاق مضمون للأدمن
      return; // إنهاء الدالة لمنع التداخل
    }

    if (this.data?.preventRedirect) {
      this.dialogRef.close(); // إغلاق مضمون عند منع التوجيه (مثل صفحة السلة)
      return; // إنهاء الدالة
    }

    if (this.data?.urlAfterLogin) {
      this.router.navigate([this.data.urlAfterLogin]);
    } else {
      this.router.navigate(['/user']);
    }

    this.dialogRef.close();
  }
}

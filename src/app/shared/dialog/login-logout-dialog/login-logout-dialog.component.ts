import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FormErrorComponent } from '@shared/component/form-error/form-error.component';
import { SharedModule } from '@shared/shared.module';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { BaseComponent } from '@core/base/base-component';
import { LocalStorageService } from '@shared/services/local-storage-service.service';
import { UserService } from '@shared/services/user.service';
import { AuthService } from '@shared/services/auth.service';
import { User } from '@models/user';
import { environment } from '@shared/environment/environment';
import { Auth } from '@models/auth';
import {
  OperationResult,
  OperationResultGeneric,
} from '@core/base/operation-result';
import { MatIcon } from '@angular/material/icon';

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
  private storage = inject(LocalStorageService);
  userService = inject(UserService);
  user: User = new User();
  loginError: string | null = null;
  auth: Auth = new Auth();
  confirmEmailForm: boolean = false;
  private readonly token_KEY = environment.token_KEY;
  @Output() notify = new EventEmitter<boolean>();
  isLoginForm: boolean = true;
  hidePassword: any = false;
  loading: boolean | null = false;
  hideConfirmPassword: any = true;
  //emailVerification: any;
  //inVerificationCodeStep = false;
  constructor(
    public dialogRef: MatDialogRef<LoginLogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { urlAfterLogin?: string; preventRedirect: boolean },
  ) {
    super();
  }
  ngOnInit(): void {
    // if (this.authService.isAuthenticated()) {
    //   this.router.navigate(['/']);
    // }
  }

  // checkVerification(form: NgForm) {
  //   if (form.invalid) {
  //     form.control.markAllAsTouched();
  //     return;
  //   }
  // }
  createUser(form: NgForm) {
    if (this.authService.isAuthenticatedSignal()) return;
    if (form.invalid || this.user.password !== this.user.confirmPassword) {
      form.control.markAllAsTouched();
      return;
    }
    this.userService.create(this.user).subscribe({
      next: (res: OperationResultGeneric<User>) => {
        if (res.success) {
          this.auth.userName = this.user.userName;
          this.auth.password = this.user.password;
          this.confirmEmailForm = true;
        }
        // this.storage.set(this.token_KEY, res.data);
        // this.notify.emit(true);
      },
      complete: () => {
        // this.dialogRef.close();
      },
      error: (err) => {
        this.notificationService.showError(err);
      },
    });
  }

  logIn(form: NgForm) {
    if (this.authService.isAuthenticatedSignal()) return;
    this.loginError = null;
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.authService.login(this.auth).subscribe({
      next: (res) => {
        if (res.data?.isEmailConfirmed) {
          this.navigateBasedOnRole(res);
        } else {
          this.confirmEmailForm = true;
        }
      },
      error: (err) => {
        this.loginError = this.translate.instant('general.login-error');
      },
      complete: () => {},
    });
  }

  close() {
    this.dialogRef.close();
  }

  checkVerification(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.userService.checkCode(this.auth).subscribe({
      next: (res: OperationResultGeneric<Auth>) => {
        this.navigateBasedOnRole(res);
      },
      complete: () => {},
    });
  }

  navigateBasedOnRole(res: OperationResultGeneric<Auth>) {
    this.authService.saveToken(res.data?.token ?? '');

    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin']);
    } else if (!this.data?.preventRedirect) {
      if (this.data?.urlAfterLogin) {
        this.router.navigate([this.data.urlAfterLogin]);
      } else {
        this.router.navigate(['/user']);
      }
    }

    this.dialogRef.close();
  }
}

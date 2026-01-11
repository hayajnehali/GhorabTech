import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BaseComponent } from '@core/base/base-component';
import { SOCIAL_LINKS, SocialLink } from '@core/model/social.config';
import { Auth } from '@models/auth';
import { AuthService } from '@shared/services/auth.service';
import { SharedModule } from '@shared/shared.module';
import { FormErrorComponent } from '../form-error/form-error.component';
import { User } from '@models/user';
import { UserService } from '@shared/services/user.service';
import { LocalStorageService } from '@shared/services/local-storage-service.service';
import { environment } from '@shared/environment/environment';

@Component({
  selector: 'app-login-regestration',
  templateUrl: './login-regestration.component.html',
  styleUrls: ['./login-regestration.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, FormErrorComponent],
})
export class LoginRegestrationComponent
  extends BaseComponent
  implements OnInit
{
  links: SocialLink[] = SOCIAL_LINKS;
  isSignUpMode = false;
  auth: Auth = new Auth();
  loginError: string | null = null;
  loading = false;
  private storage = inject(LocalStorageService);
  userService = inject(UserService);
  user: User = new User();
  private readonly token_KEY = environment.token_KEY;

  constructor() {
    super();
  }
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      if (this.authService.isAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  onSubmit(form: NgForm) {
    this.loginError = null;
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.authService.login(this.auth).subscribe({
      next: (res) => {
        this.authService.saveToken(res.data?.token);
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      error: (err) => {
        this.loginError = this.translate.instant('general.login-error');
        console.error(err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  // التبديل إلى وضع التسجيل
  signUpMode() {
    this.isSignUpMode = true;
  }

  // الرجوع إلى وضع تسجيل الدخول
  signInMode() {
    this.isSignUpMode = false;
  }

  save(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.userService.create(this.user).subscribe({
      next: (res: any) => {
        this.notificationService.showSuccess(
          this.translate.instant('general.success-message'),
          this.translate.instant('general.success')
        );
        this.storage.set(this.token_KEY, res.data);
      },
      error: (err) => {
        this.notificationService.showError(err);
      },
    });
  }
}

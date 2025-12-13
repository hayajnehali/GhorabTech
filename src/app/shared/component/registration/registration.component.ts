import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BaseComponent } from '@core/base/base-component';
import { User } from '@models/user';
import { environment } from '@shared/environment/environment';
import { AuthService } from '@shared/services/auth.service';
import { LocalStorageService } from '@shared/services/local-storage-service.service';
import { UserService } from '@shared/services/user.service';
import { SharedModule } from '@shared/shared.module';
import { FormErrorComponent } from "../form-error/form-error.component"; 
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-registration',
  imports: [CommonModule, SharedModule, FormErrorComponent, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent extends BaseComponent implements OnInit {
  private storage = inject(LocalStorageService);
  userService = inject(UserService);
  authService = inject(AuthService);
  user: User = new User();
  private readonly token_KEY = environment.token_KEY;
  @Output() notify = new EventEmitter<boolean>();
  //emailVerification: any;
  //inVerificationCodeStep = false;
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  // checkVerification(form: NgForm) {
  //   if (form.invalid) {
  //     form.control.markAllAsTouched();
  //     return;
  //   }
  // }
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
        this.notify.emit(true);
        //this.currentStep = 2;
      },
      error: (err) => {
        this.notificationService.showError(err);
      },
    });
  }

}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { Auth } from '@models/auth';
import { SharedModule } from '@shared/shared.module';
import { BaseComponent } from '@core/base/base-component';
import { FormErrorComponent } from "../form-error/form-error.component";

@Component({
  selector: 'app-login',
  imports: [CommonModule, SharedModule, FormsModule, RouterLink, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends BaseComponent implements OnInit {
  private authService = inject(AuthService);
  auth: Auth = new Auth();
  loginError: string | null = null;
  loading = false;
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
        this.authService.saveToken(res.data);
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
}

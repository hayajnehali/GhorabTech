import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '@shared/services/auth.service';
import { Auth } from '@models/auth';
import { SharedModule } from '@shared/shared.module';

@Component({
    selector: 'app-login',
    imports: [CommonModule, SharedModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  auth: Auth = new Auth();
  loginError: string | null = null;
  loading = false;
constructor(){
  
}
  ngOnInit() { 
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
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
        this.router.navigate(['/']); 
      },
      error: (err) => {
        this.loginError = 'فشل تسجيل الدخول. تحقق من البريد وكلمة المرور.';
        console.error(err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@shared/services/auth.service';
import { MatIcon } from "@angular/material/icon"; 
@Component({
  selector: 'app-login-logout-button',
  imports: [TranslateModule, CommonModule, RouterModule, MatIcon],
  templateUrl: './login-logout-button.component.html',
  styleUrl: './login-logout-button.component.scss',
})
export class LoginLogoutButtonComponent {
  authService = inject(AuthService); 
  constructor() {}
  // toggleAuthentication() {
  //   this.isAuthenticated = this.authService.isAuthenticated();
  // }
  logout() {
    this.authService.logout();
  }
}

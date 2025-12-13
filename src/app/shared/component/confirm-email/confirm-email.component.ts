import { Component, inject, Input } from '@angular/core';
import { FormErrorComponent } from '../form-error/form-error.component';
import { FormsModule, NgForm } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { User } from '@models/user';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, FormErrorComponent],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent {
  @Input() user: User = new User();
  userService = inject(UserService);
  checkVerification(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.userService.checkCode(this.user).subscribe({
      next: () => {},
      complete: () => {},
    });
  }
}

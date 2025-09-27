import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccess() {
    this.toastr.success('This is a success message!', 'Success');
  }

  showError(error: HttpErrorResponse) { 
      if (error.status === 400 && error.error) {
        // Display validation errors if they exist
        const validationErrors = error.error.errors || error.error; // Adjust based on your API's structure
        if (typeof validationErrors === 'string') {
          this.toastr.error(validationErrors, 'Validation Error');
        } else {
          Object.values(validationErrors).forEach((msg: any) => {
            this.toastr.error(msg, 'Validation Error');
          });
        }
      } else {
        this.toastr.error('An unexpected error occurred', 'Error');
      }
  }

  showInfo() {
    this.toastr.info('This is an informational message!', 'Info');
  }

  showWarning() {
    this.toastr.warning('This is a warning message!', 'Warning');
  }
}

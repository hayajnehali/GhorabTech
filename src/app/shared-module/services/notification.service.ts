import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr:ToastrService) { }

  showSuccess() {
    this.toastr.success('This is a success message!', 'Success');
  }

  showError() {
    this.toastr.error('This is an error message!', 'Error');
  }

  showInfo() {
    this.toastr.info('This is an informational message!', 'Info');
  }

  showWarning() {
    this.toastr.warning('This is a warning message!', 'Warning');
  }
}

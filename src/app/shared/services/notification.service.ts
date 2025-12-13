import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
    protected translate = inject(TranslateService);
  constructor(private toastr: ToastrService) {}

  showSuccess(message:string=this.translate.instant('general.success-message'),title:string=this.translate.instant('general.success')) {
    this.toastr.success(message, title);
  }

 
  showError(error: HttpErrorResponse) { 
      if (error.status === 400 && error.error) {
        // Display validation errors if they exist
        const validationErrors = error.error.errors || error.error; 
        if (typeof validationErrors === 'string') {
          this.toastr.error(validationErrors,this.translate.instant("validation.error"));
        } else {
          Object.values(validationErrors).forEach((msg: any) => {
            this.toastr.error(msg, this.translate.instant("validation.error"));
          });
        }
      } else {
        this.toastr.error('An unexpected error occurred', 'Error');
      }
  }

  showInfo() {
    this.toastr.info(this.translate.instant("validation.informational-message") ,this.translate.instant("validation.info"));
  }

  showWarning(message:string=this.translate.instant("validation.warning-message"),title:string=this.translate.instant("validation.Warning") ) {
    this.toastr.warning(message ,title);
  }
}

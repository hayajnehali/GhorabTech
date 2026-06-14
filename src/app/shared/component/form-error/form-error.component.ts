import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, NgModel } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationErrorResult } from './models/error.models';
import { getFirstError } from './helpers/error.helper';
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: 'app-form-error',
    imports: [CommonModule, TranslateModule, MatIcon],
    templateUrl: './form-error.component.html',
    styleUrl: './form-error.component.scss'
})
export class FormErrorComponent {
    @Input({ required: true }) control!: NgModel | AbstractControl;
    @Input() fieldName!: string; // TODO : Not used must remove this and any related code in the template 

    private get resolvedControl(): AbstractControl | null {
        if (!this.control) return null;
        return this.control instanceof NgModel
            ? this.control.control
            : this.control;
    }

    get error(): ValidationErrorResult | null {
        const ctrl = this.resolvedControl;
        if (!ctrl) return null;
        if (!ctrl.touched && !ctrl.dirty) return null;
        if (ctrl.valid) return null;
        return getFirstError(ctrl);
    }
}


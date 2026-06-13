import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidationErrorResult } from '../models/error.models';
import { VALIDATION_ERROR_REGISTRY } from '../registries/error.registry';

export function getFirstError(control: AbstractControl | null): ValidationErrorResult | null {
    if (!control?.errors) return null;

    const errorKey   = Object.keys(control.errors)[0];
    const errorValue = control.errors[errorKey];
    const definition = VALIDATION_ERROR_REGISTRY[errorKey];

    return definition
        ? { key: definition.translationKey, params: definition.params?.(errorValue) }
        : { key: 'validation.invalid' };
}

export function getControlErrorType(control: AbstractControl | null): string | null {
    if (!control?.invalid || !control.touched || !control.errors) return null;
    const keys = Object.keys(control.errors);
    return keys.length > 0 ? keys[0] : null;
}

export function hasFormError(form: FormGroup | null, controlName: string, errorType: string): boolean {
    const control = form?.get(controlName) ?? null;
    if (!control?.invalid || !control.touched || !control.errors) return false;
    return !!control.errors[errorType];
}
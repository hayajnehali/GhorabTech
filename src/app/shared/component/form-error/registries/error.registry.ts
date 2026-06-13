import { ValidationErrorDefinition } from "../models/error.models";

export const VALIDATION_ERROR_REGISTRY: Record<string, ValidationErrorDefinition> = {
    required:  { translationKey: 'validation.required' },
    email:     { translationKey: 'validation.email' },
    pattern:   { translationKey: 'validation.pattern' },
    password:  { translationKey: 'validation.password' },
    minlength: { translationKey: 'validation.minLength', params: (e) => ({ requiredLength: e.requiredLength, actualLength: e.actualLength }) },
    maxlength: { translationKey: 'validation.maxLength', params: (e) => ({ requiredLength: e.requiredLength, actualLength: e.actualLength }) },
    min:       { translationKey: 'validation.min', params: (e) => ({ min: e.min }) },
    max:       { translationKey: 'validation.max', params: (e) => ({ max: e.max }) },
};
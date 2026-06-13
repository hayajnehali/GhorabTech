export interface ValidationErrorDefinition {
    translationKey: string;
    params?: (error: any) => Record<string, unknown>;
}

export interface ValidationErrorResult {
    key: string;
    params?: Record<string, unknown>;
}
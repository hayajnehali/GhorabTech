export interface OperationResult {
  success: boolean;
  data?: string;
  errors?: string[]; 
  totalNumberOf: number;
}
export interface OperationResultGeneric<T> {
  success: boolean;
  message?: string;
  errors?: string[];
  data?: T;
  totalNumberOf: number;
}

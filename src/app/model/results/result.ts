export class Result<T> {
    isSuccess: boolean;
    error?: Error;
    data?: T;
}

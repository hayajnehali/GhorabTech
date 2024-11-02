export class PaginatedResult<T>{
    totalNumberOf: number=0;  // Assuming every model will have an id
    data!: T;

    constructor(init?: Partial<PaginatedResult<T>>) {
        Object.assign(this, init);
    }
}
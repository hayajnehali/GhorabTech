export class PaginatedResult<T>{
    count!: number;  // Assuming every model will have an id
    data!: T;

    constructor(init?: Partial<PaginatedResult<T>>) {
        Object.assign(this, init);
    }
}
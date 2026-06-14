export class SearchFilter<T> {
    constructor(partial: Partial<SearchFilter<T>> = {}) {
        Object.assign(this, partial);
    }
    criteria: T;
    pageNumber: number = 1;
    pageSize: number = 10;
    sortBy?: string;
    sortOrder: 'ASC' | 'DESC' = 'ASC'; // TODO: Add Constants For ASC or DESC
}

export class PagedResult<T> {
    items: T[] = [];
    totalCount: number = 0;
    pageNumber: number = 1;
    pageSize: number = 10;
    get totalPages(): number {
        return Math.ceil(this.totalCount / this.pageSize);
    }
}

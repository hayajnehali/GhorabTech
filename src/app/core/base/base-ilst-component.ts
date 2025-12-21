import { Directive, ViewChild } from '@angular/core';
import { ServiceBase } from '@shared/services/base.service';
import { BaseComponent } from './base-component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FilterBase } from '@models/filter-base';

@Directive()
export abstract class BaseListComponent<
  TData,
  TResult,
  Filter extends FilterBase
> extends BaseComponent {
  dataSource = new MatTableDataSource<TResult>();
  displayedColumns: string[] = [];
  filter: Filter = {} as Filter;
  loading = false;
  totalNumberOf: number = 0;
  pageSizeOptions: number[] = [5, 10, 20, 40, 80, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    protected service: ServiceBase<TData, TResult, Filter>,
    protected filterT: new () => Filter
  ) {
    super();
    this.filter = new filterT();
  }
  ngOnInit() {
    this.loadData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadData(): void {
    this.loading = false;
    const sub = this.service.getAll(this.filter).subscribe({
      next: (data) => {
        if (data.data) this.dataSource.data = data.data;
        this.totalNumberOf = data.totalNumberOf;
        this.loading = true;
      },
      complete: () => {
        this.processAfterComplete()
      },
      error: (err) => {},
    });
    this.subscribe(sub);
  }
  processAfterComplete() { 
  }

  delete(id: string) {
    const sub = this.service.delete(id).subscribe(() => this.loadData());
    this.subscribe(sub);
  }
  pageChanged(event: PageEvent) {
    this.filter.pageIndex = event.pageIndex + 1;
    this.filter.pageSize = event.pageSize;
    this.loadData();
  }
  get hasData(): boolean {
    return this.dataSource?.data?.length > 0;
  }
  goBack() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  search() {
    this.loadData();
  }
  reset() {
    this.filter = new this.filterT();
    this.loadData();
  }

  
}

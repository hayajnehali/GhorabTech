import { Directive, Injectable } from '@angular/core';
import { ServiceBase } from '../../shared/services/base.service';
import { BaseComponent } from './base-component';

 @Directive()
export abstract class BaseListComponent<TData,TResult,Filter extends object> extends BaseComponent {
  items: TResult[] = [];
  filter: Filter={} as Filter;
  loading = false;
  totalNumberOf: number = 0;

  constructor(protected service: ServiceBase<TData, TResult, Filter>) {
    super();
  }
  ngOnInit() {
    this.loadData()
  }
  loadData(): void {
    this.loading = false;
    this.subscribe(
      this.service.getAll(this.filter).subscribe({
        next: (data) => {
          this.items = data.data;
          this.totalNumberOf = data.totalNumberOf;
          this.loading = true;
        },
        complete: () => {},
        error: (err) => {},
      })
    );
  }

  delete(id: number) {
    this.subscribe(this.service.delete(id).subscribe(() => this.loadData()));
  }
}

// import { Directive, ViewChild } from '@angular/core';
// import { ServiceBase } from '@shared/services/base.service';
// import { BaseComponent } from './base-component';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
// import { FilterBase } from '@models/filter-base';
// import { ModelBaseWithList } from '@models/base.model';

// @Directive()
// export abstract class BaseViewComponent<
//   TData,
//   TResult extends ModelBaseWithList<TData>,
//   Filter extends FilterBase,
// > extends BaseComponent {
//   dataSource = new MatTableDataSource<TResult>();
//   displayedColumns: string[] = [];
//   filter: Filter = {} as Filter;
//   loading = false;
//   totalNumberOf: number = 0;
//   entity!: TResult;
//   mainObject!: TResult;

//   @ViewChild(MatPaginator) paginator!: MatPaginator;

//   constructor(
//     protected service: ServiceBase<TData, TResult, Filter>,
//     protected parentIsName: string = 'id'
//   ) {
//     super();
//   }

//   ngOnInit(): void {
//     const id: string | null = this.activatedRoute.snapshot.paramMap.get(
//       this.parentIsName
//     );
//     if (id != null) {
//       this.getDataForViewByParent();
//     }
//   }

//     ngAfterViewInit() {
//       this.dataSource.paginator = this.paginator;
//     }

//   getDataForViewByParent(): void {
//     this.loading = false;
//     this.service.getDataForViewByParent(this.filter).subscribe({
//       next: (result) => {
//         this.entity = result.data; 
//         this.dataSource.data = result.data.list;
//         this.totalNumberOf = result.totalNumberOf;
//       },
//       complete: () => {
//         this.loading = true;
//       },
//     });
//   }

//     pageChanged(event: PageEvent) {
//       this.filter.pageIndex = event.pageIndex + 1;
//       this.filter.pageSize = event.pageSize;
//       this.getDataForViewByParentID();
//     }

//     get hasData(): boolean {
//       return this.dataSource?.data?.length > 0;
//     }

//     goBack() {
//       this.router.navigate(['../'], { relativeTo: this.activatedRoute });
//     }
// }

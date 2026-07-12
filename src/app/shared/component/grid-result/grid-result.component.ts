import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
  input,
  model,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {
  GridColumnDirective,
  GridExpandedDirective,
} from './components/grid-column.directive';
import { SelectionModel } from '@angular/cdk/collections';
import { debounceTime, Subject } from 'rxjs';
import { PageEvent } from '../pagination/pagination.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { A11yModule } from '@angular/cdk/a11y';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export interface LazyLoadEvent {
  first: number;
  rows: number;
  sortField: string | null;
  sortOrder: 1 | -1 | null;
}

@Component({
  selector: 'grid-result',
  templateUrl: './grid-result.component.html',
  styleUrl: './grid-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    A11yModule,
    TranslateModule
  ],
})
export class GridResultComponent implements OnInit, OnDestroy {
  /* ── inputs ── */
  data = input<any[]>([]);
  totalRecords = input<number>(0);
  loading = input<boolean>(false);
  dataKey = input<string>('id');
  pageSize = input<number>(5);
  allowSelection = input<boolean>(false);
  allowExpand = input<boolean>(false);
  externalColumns = input<readonly GridColumnDirective[]>([]);
  externalExpanded = input<GridExpandedDirective | undefined>(undefined);

  /* ── outputs ── */
  onLazyLoad = output<PageEvent>();
  onRowSelected = output<any[]>();

  /* ── two-way binding ── */
  selection = model<any[]>([]);

  /* ── content children ── */
  internalColumns = contentChildren(GridColumnDirective);
  internalExpanded = contentChild(GridExpandedDirective);

  /* ── computed ── */
  finalColumns = computed(() => {
    const ext = this.externalColumns();
    return ext.length > 0 ? ext : this.internalColumns();
  });

  finalExpandedTemplate = computed(() => {
    const ext = this.externalExpanded();
    const int = this.internalExpanded();
    return ext?.template?.() ?? int?.template?.() ?? null;
  });

  /** Columns to pass to [displayedColumns] */
  displayedColumns = computed(() => {
    const cols: string[] = [];
    if (this.allowSelection()) cols.push('__select__');
    if (this.allowExpand()) cols.push('__expand__');
    cols.push(...this.finalColumns().map((c) => c.field()));
    return cols;
  });

  /* ── internal state ── */
  expandedRow = signal<any>(null); // one row open at a time (Material pattern)
  pageIndex = signal<number>(0);
  sortField = signal<string | null>(null);
  sortOrder = signal<1 | -1 | null>(null);

  /** CDK SelectionModel — source of truth for checkboxes */
  selModel = new SelectionModel<any>(true, []);
  private lazySubject = new Subject<LazyLoadEvent>();
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.lazySubject
      .pipe(debounceTime(100))
      .subscribe( 
    );
    this.emitLazy(); // trigger initial load
  }

  ngOnDestroy() {
    this.lazySubject.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  /* ── pagination ── */
  onPage(event: PageEvent) { 
    this.onLazyLoad.emit(event);
  }

  /* ── sort ── */
  onSort(sort: any) {
    //Sort) {
    this.sortField.set(sort.active || null);
    this.sortOrder.set(
      sort.direction === 'asc' ? 1 : sort.direction === 'desc' ? -1 : null,
    );
    this.pageIndex.set(0);
    this.emitLazy(0);
  }

  /* ── selection ── */
  isAllSelected() {
    return this.selModel.selected.length === this.data().length;
  }

  toggleAll() {
    this.isAllSelected()
      ? this.selModel.clear()
      : this.data().forEach((r) => this.selModel.select(r));
    this.selection.set(this.selModel.selected);
    this.onRowSelected.emit(this.selModel.selected);
  }

  toggleRow(row: any) {
    this.selModel.toggle(row);
    this.selection.set(this.selModel.selected);
    this.onRowSelected.emit(this.selModel.selected);
  }

  isSelected(row: any) {
    return this.selModel.isSelected(row);
  }

  /* ── expand ── */
  toggleExpand(row: any) {
    this.expandedRow.set(this.expandedRow() === row ? null : row);
  }

  isExpanded(row: any) {
    return this.expandedRow() === row;
  }

  /* ── helpers ── */
  readField<T = unknown>(
    rowData: Record<string, any>,
    field: string,
  ): T | null {
    return (
      field.split('.').reduce<any>((acc, key) => acc?.[key], rowData) ?? null
    );
  }

  private emitLazy(pageIndex = this.pageIndex(), pageSize = this.pageSize()) {
    this.lazySubject.next({
      first: pageIndex * pageSize,
      rows: pageSize,
      sortField: this.sortField(),
      sortOrder: this.sortOrder(),
    });
  }

  readonly isDetailRow = (_index: number, _row: any) => this.allowExpand();
}

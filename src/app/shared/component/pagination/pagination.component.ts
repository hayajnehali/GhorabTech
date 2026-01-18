import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface PageEvent {
  pageIndex: number;   // رقم الصفحة الحالي (0-based)
  pageSize: number;    // حجم الصفحة الحالي
  length: number;      // العدد الكلي للعناصر
}

@Component({
    selector: 'app-pagination',
    imports: [CommonModule, TranslateModule],
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() length = 0;
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  @Input() pageIndex = 0; // 0-based index

  @Output() page = new EventEmitter<PageEvent>();

  get totalPages(): number {
    return Math.ceil(this.length / this.pageSize);
  }

  get currentPage(): number {
    return this.pageIndex + 1; // للتحويل للـ1-based داخل الكود
  }

  get pages(): number[] {  
    const total = this.totalPages;
    const visible = 5; // عدد أرقام الصفحات المراد عرضها
    let start = Math.max(1, this.currentPage - Math.floor(visible / 2));
    let end = start + visible - 1;

    if (end > total) {
      end = total;
      start = Math.max(1, end - visible + 1);
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    const newPageIndex = page - 1;
    if (newPageIndex === this.pageIndex) return;
    this.pageIndex = newPageIndex;
    this.emitPageEvent();
  }

  previousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.emitPageEvent();
    }
  }

  nextPage() {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
      this.emitPageEvent();
    }
  }

  changePageSize(size: number) {
    if (size === this.pageSize) return;
    this.pageSize = size;
    this.pageIndex = 0; // ارجع للصفحة الأولى عند تغيير الحجم
    this.emitPageEvent();
  }

  private emitPageEvent() {
    this.page.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length,
    });
  }
}

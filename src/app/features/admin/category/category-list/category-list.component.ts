import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { Category, CategoryFilter, CategoryResult } from '@models/category';
import { CategoryService } from '@shared/services/category.service';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss',
    standalone: false
})
export class CategoryListComponent extends BaseListComponent<
  Category,
  CategoryResult,
  CategoryFilter
> {
  constructor(private categoryService: CategoryService) {
    super(categoryService,CategoryFilter);
    this.displayedColumns = ['id', 'categoryName','showInMain', 'action'];
  }
}

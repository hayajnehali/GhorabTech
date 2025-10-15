import { Component, OnInit } from '@angular/core'; 
import { BaseManageComponent } from '@core/base/base-manage-component'; 
import { Category, CategoryFilter, CategoryResult } from '@models/category';
import { CategoryService } from '@shared/services/category.service';

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrl: './category-manage.component.scss',
})
export class CategoryManageComponent extends BaseManageComponent<
  Category,
  CategoryResult,
  CategoryFilter
> {
  constructor(private categoryService: CategoryService) {
    super(categoryService,Category);
  }

 
}

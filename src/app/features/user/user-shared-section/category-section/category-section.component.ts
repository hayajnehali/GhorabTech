import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { Category, CategoryFilter, CategoryResult } from '@models/category';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryService } from '@shared/services/category.service';
import { ImageComponent } from '@shared/component/img/image/image.component'; 
import { CommonModule } from '@angular/common';
import { AdminModuleRoutingModule } from "app/features/admin/admin-routing.module";
import { Swiper } from 'swiper';
import { register } from 'swiper/element/bundle';
register();
@Component({
    selector: 'app-category-section',
    imports: [CommonModule, TranslateModule, ImageComponent, AdminModuleRoutingModule],
    templateUrl: './category-section.component.html',
    styleUrl: './category-section.component.scss',
     schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategorySectionComponent extends BaseListComponent<
  Category,
  CategoryResult,
  CategoryFilter
> {
  constructor(private categoryService: CategoryService) {
    super(categoryService,CategoryFilter);
    this.filter.pageSize = 4;
    this.filter.sectionView = true;
    this.filter.showInMain = true;

  }
}

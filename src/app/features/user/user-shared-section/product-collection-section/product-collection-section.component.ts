import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { Category, CategoryFilter, CategoryResult } from '@models/category';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryService } from '@shared/services/category.service';
import { ImageComponent } from '@shared/component/img/image/image.component';
import { CommonModule } from '@angular/common';
import { AdminModuleRoutingModule } from 'app/features/admin/admin-routing.module';
import { register } from 'swiper/element/bundle';
import { SharedModule } from '@shared/shared.module';
import { ProductCollectionService } from '@shared/services/product-collection.service';
import {
  ProductCollectionFilter,
  ProductCollectionRequest,
  ProductCollectionResponse,
} from '@models/product-collection.model';
register();
@Component({
  selector: 'app-product-collection-section',
  imports: [
    CommonModule,
    TranslateModule,
    ImageComponent,
    AdminModuleRoutingModule,
    SharedModule,
  ],
  templateUrl: './product-collection-section.component.html',
  styleUrl: './product-collection-section.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCollectionSectionComponent extends BaseListComponent<
  ProductCollectionRequest,
  ProductCollectionResponse,
  ProductCollectionFilter
> {
  constructor(productCollectionService: ProductCollectionService) {
    super(productCollectionService, ProductCollectionFilter);
    this.filter.pageSize = 8;
  }
}

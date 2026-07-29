import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryManageComponent } from './category-manage/category-manage.component';
import { RouterModule } from '@angular/router';
import { routesCategory } from './category-routing.module';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from '@shared/component/no-data/no-data.component';
import { SearchPageComponent } from '@shared/component/search-page/search-page.component';
import { PageHeaderComponent } from '@shared/component/search-page/components/page-header.component';
import { HeaderActionsComponent } from '@shared/component/search-page/components/header-actions.component';
import { PageFilterComponent } from '@shared/component/search-page/components/page-filter.component';
import { GridResultBodyComponent } from '@shared/component/search-page/components/grid-result-body.component';
import { GridColumnDirective } from '@shared/component/grid-result/components/grid-column.directive';
import { ButtonComponent } from '@shared/component/ui/button/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoryListComponent, CategoryManageComponent],
  imports: [
    CommonModule,
    SharedModule, 
    NoDataComponent,
    RouterModule.forChild(routesCategory),
    SearchPageComponent,
    PageHeaderComponent,
    HeaderActionsComponent,
    PageFilterComponent,
    GridResultBodyComponent,
    GridColumnDirective,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class CategoryModule {}

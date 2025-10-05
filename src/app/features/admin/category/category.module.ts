import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryManageComponent } from './category-manage/category-manage.component';
import { RouterModule } from '@angular/router';
import { routesCategory } from './category-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CategoryListComponent, CategoryManageComponent],
  imports: [
    CommonModule,
    SharedModule, 
    RouterModule.forChild(routesCategory)
  ],
  exports: [],
})
export class CategoryModule {}

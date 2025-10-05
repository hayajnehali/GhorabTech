import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { ProductCategorySectionComponent } from './category/product-category-section/product-category-section.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'product',
    component: ProductListComponent,
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./category/category.module').then((m) => m.CategoryModule),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManageComponent } from './product/product-manage/product-manage.component'; 
import { ProductListComponent } from './product/product-list/product-list.component'; 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CategoryListComponent } from './product-category/category-list/category-list.component';
import { CategoryManageComponent } from './product-category/category-manage/category-manage.component';

const routes: Routes = [
{
  path:"",
  // component:AdminDashboardComponent
  component:CategoryListComponent
}, 
{
  path:'manageProduct',
  component:ProductManageComponent
},
{
  path:'products',
  component:ProductListComponent
},
{
  path:'categorys',
  component:CategoryListComponent
},{
  path:'categoryManage',
  component:CategoryManageComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }

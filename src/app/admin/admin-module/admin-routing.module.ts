import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManageComponent } from './product/product-manage/product-manage.component'; 
import { ProductListComponent } from './product/product-list/product-list.component'; 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CategoryListComponent } from './product-category/category-list/category-list.component';
import { CategoryManageComponent } from './product-category/category-manage/category-manage.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { AdminLayOutComponent } from './layout/admin-layout/admin-layout.component';

const routes: Routes = [
{
  path:"", 
  component:AdminLayOutComponent
}, 
{
  path:'productManage',
  component:ProductManageComponent
},
{
  path:'productManage/:productId',
  component:ProductManageComponent
},
{
  path:'products',
  component:ProductListComponent
},
{
  path:'productView/:productId',
  component:ProductViewComponent
},
{
  path:'categorys',
  component:CategoryListComponent
},{
  path:'categoryManage/:productCategoryId',
  component:CategoryManageComponent
}
,{
  path:'categoryManage',
  component:CategoryManageComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }

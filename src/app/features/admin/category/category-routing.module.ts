import { Routes } from "@angular/router";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CategoryManageComponent } from "./category-manage/category-manage.component";

 
export const routesCategory: Routes = [
{
  path:"", 
  component:CategoryListComponent
}, 
{
  path:'manage',
  component:CategoryManageComponent
},
{
  path:'manage/:id',
  component:CategoryManageComponent
},
   {
    path: ':id/product-category',
    loadChildren: () => import('./product-category/product-category.module').then((m) => m.ProductCategoryModule),
  },
  
];
 
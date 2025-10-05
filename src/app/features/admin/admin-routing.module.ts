import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 export const routesAdmin: Routes = [
  {
    path: 'category',
    loadChildren: () =>
      import('./category/category.module').then((m) => m.CategoryModule),
    data: {
      label: 'category.category',
      icon: 'merge_type',
      showInSidebar: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesAdmin)],
  exports: [RouterModule],
})
export class AdminModuleRoutingModule {}

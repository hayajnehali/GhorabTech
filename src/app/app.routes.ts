import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin-module/admin.module';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path:"",
        loadChildren: () => AdminModule 
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
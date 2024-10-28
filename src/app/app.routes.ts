import { RouterModule, Routes } from '@angular/router'; 
import { NgModule } from '@angular/core'; 
import { AdminModule } from './admin/admin-module/admin.module';

export const routes: Routes = [
    {
        path:"admin",
        loadChildren: () => AdminModule 
    }
];

 
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
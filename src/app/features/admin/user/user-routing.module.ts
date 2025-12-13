import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
export const routesUser: Routes = [
  {
    path: '',
    component:UserListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesUser)],
  exports: [RouterModule],
})
export class UserModuleRoutingModule {}

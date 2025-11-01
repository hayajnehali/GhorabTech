import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
export const routesDashboard: Routes = [
 {
  path: '',
  component: DashboardComponent,
 }
];

@NgModule({
  imports: [RouterModule.forChild(routesDashboard)],
  exports: [RouterModule],
})
export class DashboardModuleRoutingModule {}

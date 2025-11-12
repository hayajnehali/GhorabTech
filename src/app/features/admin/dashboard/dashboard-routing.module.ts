import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SliderComponent } from './slider/slider.component';
export const routesDashboard: Routes = [
 {
  path: '',
  component: DashboardComponent,
 },
 {
  path:'slider-manage',
  component:SliderComponent
 },
 {
  path:'slider-manage/:id',
  component:SliderComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routesDashboard)],
  exports: [RouterModule],
})
export class DashboardModuleRoutingModule {}

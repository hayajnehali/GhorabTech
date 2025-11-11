import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModuleRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartLineComponent } from "@shared/component/charts/chart-line/chart-line.component";
import { SelectYearComponent } from "@shared/component/select-year/select-year.component";
import { SliderComponent } from './slider/slider.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardModuleRoutingModule,
    ChartLineComponent,
    SelectYearComponent
]
})
export class DashboardModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModuleRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartLineComponent } from '@shared/component/charts/chart-line/chart-line.component';
import { SelectYearComponent } from '@shared/component/select-year/select-year.component';
import { SliderComponent } from './slider/slider.component';
import { FormErrorComponent } from '@shared/component/form-error/form-error.component';
import { ImageComponent } from '@shared/component/img/image/image.component';
import { MultiImageUploadComponent } from '@shared/component/img/multi-image-uplode/multi-image-upload.component';
import { SliderListComponent } from './slider-list/slider-list.component';
import { Swiper } from 'swiper';
import { register } from 'swiper/element/bundle';
register();
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [DashboardComponent, SliderComponent, SliderListComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardModuleRoutingModule,
    ChartLineComponent,
    SelectYearComponent,
    FormErrorComponent,
    ImageComponent,
    MultiImageUploadComponent,
  ],
})
export class DashboardModule {}

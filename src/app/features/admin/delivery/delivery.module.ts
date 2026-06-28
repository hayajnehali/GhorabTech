import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { routesDelivery } from './delivery-routing.module';
import { FormErrorComponent } from '@shared/component/form-error/form-error.component';
import { DeliveryZoneListComponent } from './pages/delivery-zone-list/delivery-zone-list.component';
import { PageHeaderComponent } from '@shared/component/search-page/components/page-header.component';
import { SearchPageComponent } from '@shared/component/search-page/search-page.component';
import { HeaderActionsComponent } from '@shared/component/search-page/components/header-actions.component';
import { ButtonComponent } from '@shared/component/ui/button/button/button.component';
import { PageFilterComponent } from '@shared/component/search-page/components/page-filter.component';
import { GridResultBodyComponent } from '@shared/component/search-page/components/grid-result-body.component';
import {
  GridColumnDirective,
  GridExpandedDirective,
} from '@shared/component/grid-result/components/grid-column.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageDeliveryZoneComponent } from './dialog/manage-delivery-zone/manage-delivery-zone.component';
import { DeliveryTimeSlotListComponent } from './pages/delivery-time-slot-list/delivery-time-slot-list.component';
import { ManageDeliveryTimeSlotComponent } from './dialog/manage-delivery-time-slot/manage-delivery-time-slot.component';
import { TimePickerComponent } from "@shared/component/ui/time/time-picker.component";
import { TimeFormatPipe } from "@shared/pipe/time-format.pipe";

@NgModule({
  declarations: [
    DeliveryZoneListComponent,
    ManageDeliveryZoneComponent,
    DeliveryTimeSlotListComponent,
    ManageDeliveryTimeSlotComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routesDelivery),
    FormErrorComponent,
    PageHeaderComponent,
    SearchPageComponent,
    HeaderActionsComponent,
    ButtonComponent,
    PageFilterComponent,
    GridResultBodyComponent,
    GridColumnDirective,
    GridExpandedDirective,
    ReactiveFormsModule,
    TimePickerComponent,
    TimeFormatPipe
],
})
export class DeliveryModule {}

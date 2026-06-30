import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { routesDelivery } from './delivery-routing.module'; 
import { DeliveryZoneListComponent } from './pages/delivery-zone-list/delivery-zone-list.component'; 
import { ManageDeliveryZoneComponent } from './dialog/manage-delivery-zone/manage-delivery-zone.component';
import { DeliveryTimeSlotListComponent } from './pages/delivery-time-slot-list/delivery-time-slot-list.component';
import { ManageDeliveryTimeSlotComponent } from './dialog/manage-delivery-time-slot/manage-delivery-time-slot.component';

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
 
],
})
export class DeliveryModule {}

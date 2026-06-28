import { Routes } from '@angular/router';
import { DeliveryZoneListComponent } from './pages/delivery-zone-list/delivery-zone-list.component';
import { DeliveryTimeSlotListComponent } from './pages/delivery-time-slot-list/delivery-time-slot-list.component';
export const routesDelivery: Routes = [
  {
    path: '',
    component: DeliveryZoneListComponent,
  },
  {
    path: 'delivery-time-slot-list',
    component: DeliveryTimeSlotListComponent,
  },
];

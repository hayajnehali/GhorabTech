import { Component, inject, signal } from '@angular/core'; 
import { BaseListComponent } from '@core/base/base-ilst-component'; 
import { PagedResult } from '@models/results/search-filter';
import { MatDialog } from '@angular/material/dialog'; 
import { DeliveryTimeSlot, DeliveryTimeSlotFilter, DeliveryTimeSlotResult } from '@models/delivery/delivery-time-slot';
import { DeliveryTimeSlotService } from '@shared/services/delivery-time-slot.service';
import { ManageDeliveryTimeSlotComponent } from '../../dialog/manage-delivery-time-slot/manage-delivery-time-slot.component';

@Component({
  selector: 'app-delivery-time-slot-list',
  standalone: false,
  templateUrl: './delivery-time-slot-list.component.html',
  styleUrl: './delivery-time-slot-list.component.scss',
})
export class DeliveryTimeSlotListComponent extends BaseListComponent<
  DeliveryTimeSlot,
  DeliveryTimeSlotResult,
  DeliveryTimeSlotFilter
> {
  dialog = inject(MatDialog);  
  pagedResult = new PagedResult<DeliveryTimeSlotResult>();  
  constructor(private deliveryZoneService: DeliveryTimeSlotService) {
    super(deliveryZoneService, DeliveryTimeSlotFilter);
  }  
  manageZone(_t50: any) {
    const dialogRef = this.dialog.open(ManageDeliveryTimeSlotComponent, {
      data: {
        id: _t50,
      }
    });
    dialogRef.afterClosed().subscribe({
      complete: () => {
        this.search()
      },
    });
  }
}

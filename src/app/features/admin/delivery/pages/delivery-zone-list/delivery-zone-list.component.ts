import { Component, inject } from '@angular/core';
import { DeliveryZoneService } from '../../../../../shared/services/delivery-zone.service';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { PagedResult } from '@models/results/search-filter';
import { MatDialog } from '@angular/material/dialog';
import { ManageDeliveryZoneComponent } from '../../dialog/manage-delivery-zone/manage-delivery-zone.component';
import {
  DeliveryZone,
  DeliveryZoneFilter,
  DeliveryZoneResult,
} from '@models/delivery/delivery-zone';
@Component({
  selector: 'app-delivery-zone-list',
  standalone: false,
  templateUrl: './delivery-zone-list.component.html',
  styleUrl: './delivery-zone-list.component.scss',
})
export class DeliveryZoneListComponent extends BaseListComponent<
  DeliveryZone,
  DeliveryZoneResult,
  DeliveryZoneFilter
> {
  dialog = inject(MatDialog);
  pagedResult = new PagedResult<DeliveryZoneResult>();
  constructor(private deliveryZoneService: DeliveryZoneService) {
    super(deliveryZoneService, DeliveryZoneFilter);
  }
  redirectToAdd() {
    throw new Error('Method not implemented.');
  }
  override ngOnInit(): void {}

  manageZone(_t50: any) {
    const dialogRef = this.dialog.open(ManageDeliveryZoneComponent, {
      data: {
        id: _t50,
      },
    });
    dialogRef.afterClosed().subscribe({
      complete: () => {
        this.search();
      },
    });
  }
}

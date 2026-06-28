import { Component, Inject } from '@angular/core';
import { BaseManageComponent } from '@core/base/base-manage-component';
import {
  DeliveryZone,
  DeliveryZoneFilter,
  DeliveryZoneResult,
} from '../../../../../model/delivery/delivery-zone';
import { DeliveryZoneService } from '../../../../../shared/services/delivery-zone.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-delivery-zone',
  standalone: false,
  templateUrl: './manage-delivery-zone.component.html',
  styleUrl: './manage-delivery-zone.component.scss',
})
export class ManageDeliveryZoneComponent extends BaseManageComponent<
  DeliveryZone,
  DeliveryZoneResult,
  DeliveryZoneFilter
> {
  constructor(
    service: DeliveryZoneService,
    public dialogRef: MatDialogRef<ManageDeliveryZoneComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id?: string },
  ) {
    super(service, DeliveryZone);
  }

  override ngOnInit(): void {
    let id: string | undefined = this.data.id;
    if (id) {
      this.isAdd = false;
      this.getById(id);
    } else {
      this.isAdd = true;
    }
    this.onInitData();
  }
  close() {
    this.dialogRef.close();
  }
  override onCreate() {
    this.close();
  }
  override onEdit() {
    this.close();
  }
}

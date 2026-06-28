import { Component, Inject } from '@angular/core';
import { BaseManageComponent } from '@core/base/base-manage-component'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeliveryTimeSlot, DeliveryTimeSlotFilter, DeliveryTimeSlotResult } from '@models/delivery/delivery-time-slot';
import { DeliveryTimeSlotService } from '@shared/services/delivery-time-slot.service';

@Component({
  selector: 'app-manage-delivery-time-slot',
  standalone: false,
  templateUrl: './manage-delivery-time-slot.component.html',
  styleUrl: './manage-delivery-time-slot.component.scss',
})
export class ManageDeliveryTimeSlotComponent extends BaseManageComponent<
  DeliveryTimeSlot,
  DeliveryTimeSlotResult,
  DeliveryTimeSlotFilter
> {
  constructor(
    service: DeliveryTimeSlotService,
    public dialogRef: MatDialogRef<ManageDeliveryTimeSlotComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id?: string },
  ) {
    super(service, DeliveryTimeSlot);
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

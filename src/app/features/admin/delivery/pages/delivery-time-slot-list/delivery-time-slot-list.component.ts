import { Component, inject, signal } from '@angular/core'; 
import { BaseListComponent } from '@core/base/base-ilst-component';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  $searchTrigger: Subject<void> = new Subject<void>();
  filterForm: FormGroup;
  pagedResult = new PagedResult<DeliveryTimeSlotResult>();
  filterVisible = signal(true);
  private readonly fb = inject(FormBuilder);
  constructor(private deliveryZoneService: DeliveryTimeSlotService) {
    super(deliveryZoneService, DeliveryTimeSlotFilter);
  }
  redirectToAdd() {
    throw new Error('Method not implemented.');
  }
  override ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    let filter: DeliveryTimeSlotFilter = new DeliveryTimeSlotFilter();
    this.filterForm = this.fb.group<DeliveryTimeSlotFilter>(filter);
  }

  onResetSearch(): void {
    this.$searchTrigger.next();
  }

  toggleFilter(): void {
    this.filterVisible.update((v) => !v);
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

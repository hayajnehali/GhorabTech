import { Component, inject, signal } from '@angular/core';
import {
  DeliveryZone,
  DeliveryZoneFilter,
  DeliveryZoneResult,
} from '../../models/delivery-zone';
import { DeliveryZoneService } from '../../services/delivery-zone.service';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PagedResult } from '@models/results/search-filter';
import { MatDialog } from '@angular/material/dialog';
import { ManageDeliveryZoneComponent } from '../../dialog/manage-delivery-zone/manage-delivery-zone.component';
@Component({
  selector: 'app-delivery-manage',
  standalone: false,
  templateUrl: './delivery-manage.component.html',
  styleUrl: './delivery-manage.component.scss',
})
export class DeliveryManageComponent extends BaseListComponent<
  DeliveryZone,
  DeliveryZoneResult,
  DeliveryZoneFilter
> {
  dialog = inject(MatDialog);
  $searchTrigger: Subject<void> = new Subject<void>();
  filterForm: FormGroup;
  pagedResult = new PagedResult<DeliveryZoneResult>();
  filterVisible = signal(true);
  private readonly fb = inject(FormBuilder);
  constructor(private deliveryZoneService: DeliveryZoneService) {
    super(deliveryZoneService, DeliveryZoneFilter);
  }
  redirectToAdd() {
    throw new Error('Method not implemented.');
  }
  override ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    let filter: DeliveryZoneFilter = new DeliveryZoneFilter();
    this.filterForm = this.fb.group<DeliveryZoneFilter>(filter);
  }

  onResetSearch(): void {
    this.$searchTrigger.next();
  }

  toggleFilter(): void {
    this.filterVisible.update((v) => !v);
  }
  manageZone(_t50: any) {
    const dialogRef = this.dialog.open(ManageDeliveryZoneComponent, {
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

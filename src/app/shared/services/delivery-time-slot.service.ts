import { Injectable } from '@angular/core';
import { ServiceBase } from '@shared/services/base.service';
import { DeliveryTimeSlot, DeliveryTimeSlotFilter, DeliveryTimeSlotResult } from '../../model/delivery/delivery-time-slot';
import { HttpClient } from '@angular/common/http';
import { apiName } from '@shared/Enum/api-name';

@Injectable({
  providedIn: 'root',
})
export class DeliveryTimeSlotService extends ServiceBase<
  DeliveryTimeSlot,
  DeliveryTimeSlotResult,
  DeliveryTimeSlotFilter
> {
  constructor(http: HttpClient) {
    super(http, apiName.DeliveryTimeSlot);
  }
}

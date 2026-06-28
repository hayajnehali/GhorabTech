import { Injectable } from '@angular/core';
import { ServiceBase } from '@shared/services/base.service';
import { DeliveryZone, DeliveryZoneFilter, DeliveryZoneResult } from '../../model/delivery/delivery-zone';
import { HttpClient } from '@angular/common/http';
import { apiName } from '@shared/Enum/api-name';

@Injectable({
  providedIn: 'root',
})
export class DeliveryZoneService extends ServiceBase<
  DeliveryZone,
  DeliveryZoneResult,
  DeliveryZoneFilter
> {
  constructor(http: HttpClient) {
    super(http, apiName.DeliveryZone);
  }
}

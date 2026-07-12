import { LocalizedString } from '@core/base/localized-string ';
import { ModelBase } from '@models/base.model';
import { FilterBase } from '@models/filter-base';

export class DeliveryZone extends ModelBase {
  name: LocalizedString = new LocalizedString();
  baseDeliveryCost: number = 0;
}
export class DeliveryZoneResult extends ModelBase {
  name: LocalizedString = new LocalizedString();
  baseDeliveryCost: number = 0;
}

export class DeliveryZoneFilter extends FilterBase {
  name?: string;
}

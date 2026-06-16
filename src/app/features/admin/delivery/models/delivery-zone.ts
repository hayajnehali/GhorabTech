import { LocalizedString } from '@core/base/localized-string ';
import { ModelBase } from '@models/base.model';
import { FilterBase } from '@models/filter-base';

export class DeliveryZone extends ModelBase {
  name: LocalizedString;
  BaseDeliveryCost: number;
}
export class DeliveryZoneResult extends ModelBase {
  name: LocalizedString;
  BaseDeliveryCost: number;
}

export class DeliveryZoneFilter extends FilterBase {
  name?: string;
}

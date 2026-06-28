import { LocalizedString } from '@core/base/localized-string ';
import { ModelBase } from '@models/base.model';
import { FilterBase } from '@models/filter-base';

export class DeliveryTimeSlot extends ModelBase {
  // name: LocalizedString;
  fromTime: Date | string;
  toTime: Date | string;
  extraFee: number;
}

export class DeliveryTimeSlotResult extends ModelBase {
  // name: LocalizedString;
  fromTime?: Date;
  toTime?: Date;
  extraFee: number;
}

export class DeliveryTimeSlotFilter extends FilterBase {
  // name?: LocalizedString;
  fromTime?: Date | string;
  toTime?: Date | string;
  extraFee?: number;
}

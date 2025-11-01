import { LocalizedString } from '@core/base/localized-string ';
import { ModelBase } from './base.model';
import { FilterBase } from './filter-base';
import { KeyAttributeResult } from './key-attribute';

export class KeyAttributeValue extends ModelBase {
  value: LocalizedString = new LocalizedString();
}
export class KeyAttributeValueResult extends ModelBase {
  value: LocalizedString = new LocalizedString();
  keyAttribute: KeyAttributeResult = new KeyAttributeResult();
}
export class KeyAttributeValueFilter extends FilterBase {}

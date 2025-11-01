import { LocalizedString } from '@core/base/localized-string ';
import { ModelBase } from './base.model';
import { FilterBase } from './filter-base';
import {
  KeyAttributeValue,
  KeyAttributeValueResult,
} from './key-attribute-value';

export class KeyAttribute extends ModelBase {
  name: LocalizedString = new LocalizedString();
  keyAttributeValues: KeyAttributeValue[] = [];
}
export class KeyAttributeResult extends ModelBase {
  name: LocalizedString = new LocalizedString();
  keyAttributeValues: KeyAttributeValueResult[] = [];
}
export class KeyAttributeFilter extends FilterBase {}

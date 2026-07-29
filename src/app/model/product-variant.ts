import { LocalizedString } from '@core/base/localized-string ';
import { ModelBase } from './base.model';
import { FilterBase } from './filter-base';

export class ProductVariantDto extends ModelBase {
  productId?: string;
  price: number = 0;
  priceBeforeDiscount?: number;
  stock: number = 0;
  attributes?: ProductVariantAttributeDto[] = [];
}

export class ProductVariantAttributeDto extends ModelBase {
  keyAttributeValueId: string = '';
}

export class ProductVariantResult extends ModelBase {
  productId: string = '';
  price: number = 0;
  priceBeforeDiscount?: number;
  stock: number = 0;
  reservedStock: number = 0;
  availableStock: number = 0;
  attributes?: ProductVariantAttributeResult[] = [];
}

export class ProductVariantAttributeResult extends ModelBase {
  keyAttributeValueId: string = '';
  value?: LocalizedString;
  keyAttributeId?: string;
  keyAttributeName?: LocalizedString;
}

export class ProductVariantFilter extends FilterBase {
  productId?: string | null;
}

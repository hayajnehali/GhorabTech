import { LocalizedString } from '@core/base/localized-string ';
import { ModelBase } from './base.model';
import { FilterBase } from './filter-base';
import { ProductImage } from './Images';
import { ProductCategoryResult } from './product-category';
import {
  KeyAttributeValue,
  KeyAttributeValueResult,
} from './key-attribute-value';

export class Product extends ModelBase {
  productId: number | undefined;
  name: LocalizedString = new LocalizedString();
  price?: number;
  priceBeforeDiscount?: number;
  count?: number;
  productCategoryId?: string;
  description: LocalizedString = new LocalizedString();
  images: ProductImage[] = [];
  keyAttributeValues?: KeyAttributeValue[] = [];
  constructor() {
    super();
    // Additional initialization can go here
  }
}
export class ProductResult extends ModelBase {
  productId: number | undefined;
  name: LocalizedString = new LocalizedString();
  price?: number;
  count?: number;
  productCategoryId?: number;
  description: LocalizedString = new LocalizedString();
  images: ProductImage[] = [];
  productCategory: ProductCategoryResult = new ProductCategoryResult();
  keyAttributeValues?: KeyAttributeValueResult[] = [];
  priceBeforeDiscount?: number;
  discountRated? : string;
  constructor() {
    super();
  }
}

export class ProductFilter extends FilterBase {
  productCategoryId?: string | null;
}

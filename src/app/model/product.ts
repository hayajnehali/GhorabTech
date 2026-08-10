import { LocalizedString } from '@core/base/localized-string ';
import { ModelBase } from './base.model';
import { FilterBase } from './filter-base';
import { ProductImage } from './Images';
import { ProductCategoryResult } from './product-category';
import { ProductVariantDto, ProductVariantResult } from './product-variant';

export class Product extends ModelBase {
  productId: number | undefined;
  name: LocalizedString = new LocalizedString();
  productCategoryId?: string;
  description: LocalizedString = new LocalizedString();
  productImages: ProductImage[] = [];
  variants?: ProductVariantDto[] = [];
  constructor() {
    super();
  }
}
export class ProductResult extends ModelBase {
  productId: number | undefined;
  name: LocalizedString = new LocalizedString();
  productCategoryId?: number;
  description: LocalizedString = new LocalizedString();
  productImages: ProductImage[] = [];
  productCategory: ProductCategoryResult = new ProductCategoryResult();
  variants?: ProductVariantResult[] = [];
  averageRating: number = 0;
  selected: boolean = false;
  constructor() {
    super();
  }
}

export class ProductFilter extends FilterBase {
  productCategoryId?: string | null;
  name: string | null | undefined;
}

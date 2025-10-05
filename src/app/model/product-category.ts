import { LocalizedString } from '@core/base/localized-string ';
import { ModelBase } from './base.model';
import { FilterBase } from './filter-base';
import { CategoryImage } from './Images';
import { Product, ProductResult } from './product';
import { CategoryResult } from './category';

export class ProductCategory extends ModelBase {
  categoryId?: string;
  name: LocalizedString = new LocalizedString();
  images: CategoryImage[] = [];
  constructor() {
    super();
  }
}
export class ProductCategoryResult extends ModelBase {
  productCategoryId?: string;
  name: LocalizedString = new LocalizedString();
  products: ProductResult[] = [];
  category: CategoryResult=new CategoryResult();
  images: CategoryImage[] = [];

  constructor() {
    super();
  }
}

export class ProductCategoryFilter extends FilterBase {
  CategoryId?: string|null;
  productCategoryId?: string|null;
    constructor() {
    super();
  }
}

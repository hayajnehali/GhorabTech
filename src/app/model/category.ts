import { LocalizedString } from '@core/base/localized-string ';
import { ModelBase } from './base.model';
import { FilterBase } from './filter-base';
import { ProductCategory, ProductCategoryResult } from './product-category';

export class Category extends ModelBase {
  name: LocalizedString = new LocalizedString();
  description: LocalizedString = new LocalizedString();
  showInMain: boolean = false;
  constructor() {
    super();
  }
}
export class CategoryResult extends ModelBase {
  name: LocalizedString = new LocalizedString();
  description?: LocalizedString = new LocalizedString();
  showInMain: boolean = false;
  productCategories: ProductCategoryResult[]= [];
  constructor() {
    super();
  }
}

export class CategoryFilter extends FilterBase {
  sectionView?: boolean;
  showInMain?: boolean;
}

import { LocalizedString } from '@core/base/localized-string ';
import { ModelBase } from './base.model';
import { FilterBase } from './filter-base'; 
import { ProductCategory } from './product-category';

export class Category extends ModelBase {
  name: LocalizedString = new LocalizedString();
  description: LocalizedString = new LocalizedString(); 
  constructor() {
    super();
  }
}
export class CategoryResult extends ModelBase {
  name: LocalizedString = new LocalizedString(); 
  description?: LocalizedString = new LocalizedString(); 
  productCategories:ProductCategory[]=[]
  constructor() {
    super();
  }
}

export class CategoryFilter extends FilterBase {
  sectionView?:boolean
}

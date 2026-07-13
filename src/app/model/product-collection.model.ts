import { LocalizedString } from '@core/base/localized-string ';
import { ModelBase } from '@models/base.model';
import { FilterBase } from '@models/filter-base'; 
import { ProductResult } from './product';

export class ProductCollectionRequest extends ModelBase { 
  name: LocalizedString;
  description: LocalizedString;
  sortOrder: number;
  items: ProductCollectionItemRequest[];
}

export class ProductCollectionItemRequest extends ModelBase {
  productId: string;
  sortOrder: number;
}
export class ProductCollectionFilter extends FilterBase {
  text: string;
}

export class ProductCollectionResponse extends ModelBase {
  name: LocalizedString;
  code: string;
  collectionType: number;
  description: LocalizedString;
  sortOrder: number;
  productCollectionItems: ProductCollectionItemResponse[];
}

export class ProductCollectionItemResponse  extends ModelBase { 
  productId: string;
  product: ProductResult;
  sortOrder: number;
}
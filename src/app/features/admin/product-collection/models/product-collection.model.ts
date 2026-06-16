import { LocalizedString } from '@core/base/localized-string ';
import { ModelBase } from '@models/base.model';
import { FilterBase } from '@models/filter-base';

export class ProductCollectionRequest extends ModelBase {
  name: LocalizedString;
  description: LocalizedString;
  sortOrder: number;
  items: ProductCollectionItemRequest[];
}

export class ProductCollectionItemRequest extends ModelBase{
  productId: string;
  sortOrder: number;
}
 export class ProductCollectionFilter extends FilterBase{
   text: string;
 }
 

export class ProductCollectionResponse extends ModelBase {
  name: LocalizedString;
  code: string;
  collectionType: number;
  description: LocalizedString;
  sortOrder: number;
  items: ProductCollectionItemResponse[];
}

export class ProductCollectionItemResponse {
  id: string;
  productId: string;
  sortOrder: number;
}

import { LocalizedString } from '@core/base/localized-string ';
import { ModelBase } from '@models/base.model';
import { ProductImage } from '@models/Images';
import { ProductResult } from '@models/product';

export class ProductCollectionRequest {
  id:string | null;
  name: LocalizedString;
  description: LocalizedString;
  sortOrder: number;
  items: ProductCollectionItemRequest[];
}

export class ProductCollectionItemRequest {
  productId: string;
  sortOrder: number;
}

export class SearchProductCollectionFilter {
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
  product: ItemProductResult;
  sortOrder: number;
}

export class ItemProductResult {
  id: string;
  name: LocalizedString;
  price: number;
  productImages: ProductImage[];
}

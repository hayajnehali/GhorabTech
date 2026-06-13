import { LocalizedString } from '@core/base/localized-string ';

export class ProductCollectionRequest {
  name: LocalizedString;
  description: LocalizedString;
  sortOrder: number;
  items: ProductCollectionItemRequest[];
}

export class ProductCollectionItemRequest {
  productId: string;
  sortOrder: number;
}

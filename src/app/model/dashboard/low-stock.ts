import { LocalizedString } from '@core/base/localized-string ';

export class LowStockResult {
  productId: string = '';
  productName?: LocalizedString;
  variantId: string = '';
  variantDescription?: string;
  availableStock: number = 0;
  stock: number = 0;
  reservedStock: number = 0;
}

import { ModelBase } from './base.model';
import { FilterBase } from './filter-base';
import { Product, ProductResult } from './product';
import { ProductVariantResult } from './product-variant';

export class CartItem extends ModelBase {
  cartItemId?: string;
  quantity: number = 1;
  product: Product = new Product();
  productVariantId: string = '';
  productVariant?: ProductVariantResult;
  get total(): number {
    return this.quantity * (this.productVariant?.price ?? 0);
  }
  constructor() {
    super();
  }
}

export class CartItemResult extends ModelBase {
  cartItemId?: string;
  quantity: number = 0;
  product: ProductResult = new ProductResult();
  productVariantId?: string;
  productVariant?: ProductVariantResult;
  total: number = 0;
  constructor() {
    super();
  }
}
export class CartItemFilter extends FilterBase {
  cartId?: string | null;
}

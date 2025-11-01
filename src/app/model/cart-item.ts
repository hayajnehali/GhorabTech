import { ModelBase } from './base.model';
import { FilterBase } from './filter-base';
import { KeyAttributeValueResult } from './key-attribute-value';
import { Product, ProductResult } from './product';

export class CartItem extends ModelBase {
  cartItemId?: string;
  quantity: number = 1;
  product: Product = new Product();
  keyAttributeValues: KeyAttributeValueResult[] = [];
  get total(): number {
    return this.quantity * (this.product.price ?? 0);
  }
  constructor() {
    super();
  }
}

export class CartItemResult extends ModelBase {
  cartItemId?: string;
  quantity: number = 0;
  product: ProductResult = new ProductResult();
  total: number = 0;
  keyAttributeValues: KeyAttributeValueResult[] = [];
  unitPrice: number = 0;
  constructor() {
    super();
  }
}
export class CartItemFilter extends FilterBase {
  cartId?: string | null;
}

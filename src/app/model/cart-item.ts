import { ModelBase } from './base.model';
import { Product, ProductResult } from './product';

export class CartItem extends ModelBase {
  cartItemId?: number; 
  quantity: number = 0;
  product: ProductResult = new ProductResult();
   get total(): number {
    return this.quantity * (this.product.price ?? 0);
  }
  constructor() {
    super();

  }
}

import { Data } from '@angular/router';
import { ModelBase } from './base.model';
import { CartItem, CartItemResult } from './cart-item';
import { FilterBase } from './filter-base';
import { CartStatus, OrderExitStatus } from '@shared/Enum/cart-enum';

export class Cart extends ModelBase {
  userId?: string | null;
  expiresAt?: Data = new Date();
  cartItems: CartItem[] = [];
  currency: string = 'usd';
  orderExitStatus?: OrderExitStatus;
  recipientInfo: RecipientInfo = new RecipientInfo();
}
export class CartResult extends ModelBase {
  userName?: string;
  cartItems: CartItemResult[] = [];
  paymentStatus?: string;
  orderExitStatus?: OrderExitStatus;
}
export class CartFilter extends FilterBase {
  paymentStatus?: CartStatus;
  orderExitStatus?: OrderExitStatus;
}

export class RecipientInfo {
  fullName: string = '';
  phoneNumber?: string = '';
  addressLine?: string = '';
  city?: string;
  stateOrProvince?: string;
  postalCode?: string;
  country?: string;
  notes?: string = '';
}

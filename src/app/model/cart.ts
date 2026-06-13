import { Data } from '@angular/router';
import { ModelBase } from './base.model';
import { CartItem, CartItemResult } from './cart-item';
import { FilterBase } from './filter-base';
import { CartStatus, OrderExitStatus } from '@shared/Enum/cart-enum';
import { PayWay, RegistrationWay } from '@shared/Enum/pay-way';

export class Cart extends ModelBase {
  expiresAt?: Data = new Date();
  cartItems: CartItem[] = [];
  currency: string = 'usd';
  orderExitStatus?: OrderExitStatus;
  recipientInfo?: RecipientInfo = new RecipientInfo();
  cartowner: CartOwner = new CartOwner();
  payWay: PayWay | undefined;
  sameSenderRecipientInfo: boolean = false;
  deliveryDate?: Date;
  delivaryTimeId?: string;
  notes?: string;
  registrationWay: any = RegistrationWay;
}
export class CartResult extends ModelBase {
  userName?: string;
  cartItems: CartItemResult[] = [];
  paymentStatus?: string;
  orderExitStatus?: OrderExitStatus;
  payWay: PayWay | undefined;
  sameSenderRecipientInfo: boolean = false;
  deliveryDate?: Date;
  delivaryTimeId?: string;
  cartowner: CartOwner = new CartOwner();
  registrationWay: any = RegistrationWay;
}
export class CartFilter extends FilterBase {
  paymentStatus?: CartStatus;
  orderExitStatus?: OrderExitStatus;
  payWay?: PayWay;
}

export class CartOwner {
  userId?: string | null;
  fullName?: string;
  phoneNumber?: string;
  addressLine?: string;
  city?: string;
  stateOrProvince?: string;
  postalCode?: string;
  country?: string;
  email: any;
}
export class RecipientInfo {
  fullName?: string;
  phoneNumber?: string;
  addressLine?: string;
  city?: string;
  stateOrProvince?: string;
  postalCode?: string;
  country?: string;
}

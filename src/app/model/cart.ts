import { Data } from '@angular/router';
import { ModelBase } from './base.model';
import { CartItem } from './cart-item';
import { FilterBase } from './filter-base';

export class Cart extends ModelBase {
  userId?: string | null;
  expiresAt?: Data = new Date();
  cartItems: CartItem[] = [];
  currency: string = 'usd'; 
  recipientInfo:RecipientInfo=new RecipientInfo()
}
export class CartResult extends ModelBase {}
export class CartFilter extends FilterBase {}
 
export class RecipientInfo {
  fullName: string ='';         
  phoneNumber?: string='';       
  addressLine?: string='';      
  city?: string;                
  stateOrProvince?: string;   
  postalCode?: string;        
  country?: string;            
  notes?: string='';    
}

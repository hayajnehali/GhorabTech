// stripe.service.ts
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  stripe: Stripe | null = null;

  async loadStripe() {
    if (!this.stripe) {
      this.stripe = await loadStripe('pk_test_51SG5IbBRibU3JY4KlHk2oArhD78ZPLPq1yVDCsHDs3wZ4Hee4BrpAaKdSMhEVMmAQQIpByrjlnyJhZC9vWXIzrbQ00LcldJ7rf'); // public key
    }
    return this.stripe;
  }
}

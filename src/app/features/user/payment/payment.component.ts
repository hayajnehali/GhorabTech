import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '@shared/services/cart.service';
import { Cart, RecipientInfo } from '@models/cart';
import { User, UserResult } from '@models/user';
import { UserService } from '@shared/services/user.service';
import { BaseComponent } from '@core/base/base-component';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from '@shared/services/local-storage-service.service';
import { environment } from '@shared/environment/environment';
import { PaymentService } from '@shared/services/payment.service';
import { AuthService } from '@shared/services/auth.service';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
    standalone: false
})
export class PaymentComponent extends BaseComponent implements OnInit {
  private readonly token_KEY = environment.token_KEY;
  cart: Cart = new Cart();
  cartService = inject(CartService);
  authService = inject(AuthService);
  paymentService = inject(PaymentService);
  private storage = inject(LocalStorageService);

  currentStep: number = 1;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.cart.recipientInfo = new RecipientInfo();
    if (this.storage.get(this.token_KEY)) {
      this.currentStep = 2;
    }
  }

  onSubmitCard(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.cart.userId =this.authService.user()?.certserialnumber
    this.paymentService.checkout(this.cart).subscribe((res: any) => {
      window.location.href = res.data;
    });
  }

  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }
  onNotify($event: boolean) {
    if ($event) {
      this.currentStep = 2;
    }
  }
}

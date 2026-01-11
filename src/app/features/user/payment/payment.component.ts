import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '@shared/services/cart.service';
import { Cart, CartFilter, CartResult, RecipientInfo } from '@models/cart';
import { LocalStorageService } from '@shared/services/local-storage-service.service';
import { environment } from '@shared/environment/environment';
import { PaymentService } from '@shared/services/payment.service';
import { AuthService } from '@shared/services/auth.service';
import { PayWay } from '@shared/Enum/pay-way';
import { BaseManageComponent } from '@core/base/base-manage-component';
import { OperationResultGeneric } from '@core/base/operation-result';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: false,
})
export class PaymentComponent extends BaseManageComponent<
  Cart,
  CartResult,
  CartFilter
> {
  private readonly token_KEY = environment.token_KEY; 
  paymentService = inject(PaymentService);
  private storage = inject(LocalStorageService);
  payway = PayWay;
  currentStep: number = 1;

  constructor(private cartService: CartService) {
    super(cartService, Cart);
  }

  override ngOnInit(): void {
    this.isAdd = true;
    this.entity = this.cartService.getCart();
    this.entity.recipientInfo = new RecipientInfo();
    if (this.authService.isAuthenticatedSignal()) {
      this.currentStep = 2;
    }
  }

  override processData(): void {
    this.entity.userId = this.authService.user()?.certserialnumber;
  }
  override onLoadedData(req: any): void {
    window.location.href = req.data;
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
  override add() {
    let reslut: OperationResultGeneric<Cart>;
    if (this.entity.cartItems.length == 0) {
      this.notificationService.showWarning(
        this.translate.instant('cart.product-limit')
      );
      return;
    }
    const sub = this.cartService.createAndPay(this.entity).subscribe({
      next: (res) => {
        reslut = res;
      },
      complete: () => {
        // this.notificationService.showSuccess(
        //   this.translate.instant('general.success-message'),
        //   this.translate.instant('general.success')
        // );
        this.cartService.clearCart();
        if (this.entity.payWay == PayWay.visa) {
          window.location.href = reslut.message ?? '';
        } else {
          this.goBack();
        }
      },
      error: (err) => {
        this.notificationService.showError(err);
      },
    });
    this.subscribe(sub);
  }
}

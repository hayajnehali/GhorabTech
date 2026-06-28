import { Component, inject, OnInit } from '@angular/core';
import { Cart, CartOwner } from '@models/cart';
import { CartItem } from '@models/cart-item';
import { CartService } from '@shared/services/cart.service';
import { BaseComponent } from '@core/base/base-component';
import { PayWay, RegistrationWay } from '@shared/Enum/pay-way';
import { NgForm } from '@angular/forms';
import { LoginLogoutDialogComponent } from '@shared/dialog/login-logout-dialog/login-logout-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryZoneService } from '@shared/services/delivery-zone.service';
import {
  DeliveryZoneFilter,
  DeliveryZoneResult,
} from '@models/delivery/delivery-zone';
import { DeliveryTimeSlotService } from '@shared/services/delivery-time-slot.service';
import {
  DeliveryTimeSlotFilter,
  DeliveryTimeSlotResult,
} from '@models/delivery/delivery-time-slot';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.scss',
  standalone: false,
})
export class CartViewComponent extends BaseComponent implements OnInit {
  cartService = inject(CartService);
  dialog = inject(MatDialog);
  deliveryZoneService = inject(DeliveryZoneService);
  deliveryTimeSlotService = inject(DeliveryTimeSlotService);
  cart: Cart = new Cart();
  total: number = 0;
  payway: any = PayWay;
  entity: any;
  registrationWay: typeof RegistrationWay = RegistrationWay;
  todayDate: string = new Date().toISOString().split('T')[0];
  deliveryZones: DeliveryZoneResult[] = [];
  deliveryTimeSlots: DeliveryTimeSlotResult[] = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.cart = new Cart();
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
      this.cart.cartowner = new CartOwner();
    });
    this.cartService.cartTotal$.subscribe((total) => {
      this.total = total;
    });
    this.loadDeliveryData();
  }

  loadDeliveryData(): void {
    let deliveryZoneFilter = new DeliveryZoneFilter();
    deliveryZoneFilter.pageSize = 0;
    let deliveryTimeSlotFilter = new DeliveryTimeSlotFilter();
    deliveryTimeSlotFilter.pageSize = 0;
    this.deliveryZoneService.getAll(deliveryZoneFilter).subscribe({
      next: (res) => {
        this.deliveryZones = res.items ?? [];
      },
    });
    this.deliveryTimeSlotService.getAll(deliveryTimeSlotFilter).subscribe({
      next: (res) => {
        this.deliveryTimeSlots = res.items ?? [];
      },
    });
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.decreaseQuantity(item);
  }
  increaseQuantity(item: CartItem): void {
    this.cartService.increaseQuantity(item);
  }
  openLogInLogoutDialog() {
    this.authService.runWithAuth(() => {
      this.router.navigate(['/user/pay']);
    });
  }

  goToMyCrts() {
    this.authService.runWithAuth(() => {
      this.router.navigate(['user', 'my-cart']);
    });
  }
  save(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    let reslut: any;
    let apicul = this.authService.isAuthenticatedSignal()
      ? this.cartService.createAndPay(this.cart)
      : this.cartService.gustCreateAndPay(this.cart);
    apicul.subscribe({
      next: (res) => {
        reslut = res;
      },
      complete: () => {
        this.cartService.clearCart();
        if (this.cart.payWay == PayWay.visa) {
          window.location.href = reslut.message ?? '';
        } else {
          this.goBack();
        }
      },
      error: (err) => {
        this.notificationService.showError(err);
      },
    });
  }
  goBack() {
    if (this.authService.isAuthenticatedSignal()) {
      this.goToMyCrts();
    } else {
      this.router.navigateByUrl('/');
    }
  }
  checkIfLogend() {
    const dialogRef = this.dialog.open(LoginLogoutDialogComponent, {
      data: {
        preventRedirect: true,
      },
    });
    dialogRef.afterClosed().subscribe({
      complete: () => {},
    });
  }
}

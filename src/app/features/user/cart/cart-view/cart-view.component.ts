import { Component, inject, OnInit } from '@angular/core';
import { Cart, CartOwner } from '@models/cart';
import { CartItem } from '@models/cart-item';
import { CartService } from '@shared/services/cart.service';
import { BaseComponent } from '@core/base/base-component';
import { PayWay, RegistrationWay } from '@shared/Enum/pay-way';
import { NgForm } from '@angular/forms';
import { LoginLogoutDialogComponent } from '@shared/dialog/login-logout-dialog/login-logout-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.scss',
  standalone: false,
})
export class CartViewComponent extends BaseComponent implements OnInit {
  cartService = inject(CartService);
  dialog = inject(MatDialog);
  cart: Cart = new Cart();
  total: number = 0;
  payway: any = PayWay;
  entity: any;
  registrationWay: typeof RegistrationWay = RegistrationWay;
  todayDate: string = new Date().toISOString().split('T')[0];
  delivaryTimes: any = [
    { id: '3077f4f2-d343-49ac-5748-08de0eaa7085', time: '02:00 PM - 06:00 PM' },
  ];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
      this.cart.cartowner = new CartOwner();
    });
    this.cartService.cartTotal$.subscribe((total) => {
      this.total = total;
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
    this.cartService.createAndPay(this.cart).subscribe({
      next: (res) => {
        reslut = res;
      },
      complete: () => {
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

    dialogRef.afterClosed().subscribe((result: any) => {});
  }
}

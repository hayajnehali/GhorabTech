import { Component, inject, OnInit } from '@angular/core';
import { Cart } from '@models/cart';
import { CartItem } from '@models/cart-item';
import { CartService } from '@shared/services/cart.service'; 
import { BaseComponent } from '@core/base/base-component';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.scss',
  standalone: false,
})
export class CartViewComponent extends BaseComponent implements OnInit {
  cartService = inject(CartService);
  cart: Cart = new Cart();
  total: number = 0;
  constructor( ) {
    super();
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
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
    // if (this.authService.isAuthenticatedSignal()) {
    //   this.router.navigate(['user', 'pay']);
    // } else {
    //   const dialogRef = this.dialog.open(LoginLogoutDialogComponent, {
    //     width: '80%',
    //     panelClass: 'custom-dialog',
    //   });

    //   dialogRef.afterClosed().subscribe((result) => {
    //     if (this.authService.isAuthenticatedSignal()) {
    //       this.router.navigate(['/user/pay']);
    //     }
    //   });
    // }
    this.authService.runWithAuth(() => {
      this.router.navigate(['/user/pay']);
    });
  }

  goToMyCrts() {
    // if (this.authService.isAuthenticatedSignal()) {
    //   this.router.navigate(['user', 'my-cart']);
    // } else {
    //   const dialogRef = this.dialog.open(LoginLogoutDialogComponent, {
    //     width: '80%',
    //     panelClass: 'custom-dialog',
    //   });

    //   dialogRef.afterClosed().subscribe((result) => {
    //     if (this.authService.isAuthenticatedSignal()) {
    //       this.router.navigate(['/user/my-cart']);
    //     }
    //   });
    // }

    this.authService.runWithAuth(() => {
      this.router.navigate(['user', 'my-cart']);
    });
  }
}

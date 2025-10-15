import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '@models/cart-item';
import { ProductResult } from '@models/product';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '@shared/services/cart.service';
import { NotificationService } from '@shared/services/notification.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent implements OnInit {
  product: ProductResult = new ProductResult();
  cartService = inject(CartService);
  protected translate = inject(TranslateService);
  constructor(
    private router: Router,
    private productService: ProductService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProductById();
  }
  getProductById() {
    const id: string | null =
      this.activatedRoute.snapshot.paramMap.get('productId');
    if (id != null)
      this.productService.getById(id).subscribe((req) => {
        this.product = req;
      });
  }

  addToCart() {
    const item: CartItem =new CartItem()
    item.product=this.product,
    item.quantity=1 

    this.cartService.addItem(item); 
    this.notificationService.showSuccess(this.translate.instant('cart.add-to-cart'),this.translate.instant('general.success'))
  }
}

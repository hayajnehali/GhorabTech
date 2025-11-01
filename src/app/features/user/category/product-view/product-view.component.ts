import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '@models/cart';
import { CartItem } from '@models/cart-item';
import { KeyAttribute, KeyAttributeResult } from '@models/key-attribute';
import { KeyAttributeValueResult } from '@models/key-attribute-value';
import { ProductResult } from '@models/product';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '@shared/services/cart.service';
import { NotificationService } from '@shared/services/notification.service';
import { ProductService } from '@shared/services/product.service';

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrl: './product-view.component.scss',
    standalone: false
})
export class ProductViewComponent implements OnInit {
  product: ProductResult = new ProductResult();
  cartService = inject(CartService);
  keyAttributes: KeyAttributeResult[] = [];
  item: CartItem = new CartItem();
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
        if (req.data) {
          this.product = req.data!;
          this.getKeyAttribute();
        }
      });
  }

  addToCart() {
    //  const item: CartItem = new CartItem();
    //  (this.item.product = this.product), (this.item.quantity = 1);
    this.item.product.id = this.product.id;
    this.item.product.name = this.product.name;
    this.item.product.price = this.product.price;
    this.item.product.images = this.product.images;

    this.cartService.addItem(this.item);
    this.notificationService.showSuccess(
      this.translate.instant('cart.add-to-cart'),
      this.translate.instant('general.success')
    );
    this.item = new CartItem();
  }
  getKeyAttribute() {
    if (this.product.keyAttributeValues) {
      this.product.keyAttributeValues.forEach((element) => {
        if (!this.keyAttributes.find((x) => x.id == element.keyAttribute.id)) {
          this.keyAttributes.push(element.keyAttribute);
        }
        if (
          !this.keyAttributes.find((x) => x.id == element.keyAttribute.id)
            ?.keyAttributeValues
        ) {
          this.keyAttributes.find(
            (x) => x.id == element.keyAttribute.id
          )!.keyAttributeValues = [];
        }
        this.keyAttributes
          .find((x) => x.id == element.keyAttribute.id)
          ?.keyAttributeValues?.push(element);
      });
    }
  }

  selectOption(attr: KeyAttributeResult, value: KeyAttributeValueResult) {
    console.log('Selected:', attr, value);
  }

  increment() {
    this.item.quantity++;
    // let cart = this.cartService.getCart();
    // let item = cart.cartItems.find((i) => i.id == this.item.product.id);
    // if (item) {
    //   item.quantity++;
    // }
  }

  decrement() {
    if (this.item.quantity > 1) {
      this.item.quantity--;
    }
    // let cart = this.cartService.getCart();
    // let item = cart.cartItems.find((i) => i.id == this.item.product.id);
    // if (item){
    //   item.quantity--;
    // }
  }

  onAttributeSelected(attr: KeyAttributeResult, val: KeyAttributeValueResult) {
    // نبحث إذا كان نفس النوع مضاف مسبقًا (مثلاً: لون أو قياس)
    const existing = this.item.keyAttributeValues.find(
      (x) => x.keyAttribute.name.local === attr.name.local
    );

    if (existing) {
      // نبدل القيمة القديمة بالجديدة
      existing.value = val.value;
    } else {
      // نضيف قيمة جديدة
      let newVal = new KeyAttributeValueResult();
      newVal.id = val.id;
      newVal.value = val.value;
      this.item.keyAttributeValues.push(newVal);
    }

    console.log('Attributes in CartItem:', this.item);
  }
}

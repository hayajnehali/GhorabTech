import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@shared/services/product.service';
import { NotificationService } from '@shared/services/notification.service';
import { environment } from '@shared/environment/environment';
import { ProductResult } from '@models/product';
import { KeyAttributeResult } from '@models/key-attribute';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent implements OnInit {
  product: ProductResult = new ProductResult();
  environment = environment;
  keyAttributes: KeyAttributeResult[] = [];
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
  goToSlide(index: number): void {
    // const carouselElement = document.getElementById('productImageCarousel');
    // const carousel = new bootstrap.Carousel(carouselElement as HTMLElement);
    // carousel.to(index);
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
}

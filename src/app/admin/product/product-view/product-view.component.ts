import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router'; 
import { Product } from '../../../model/product';
import { ProductService } from '../../../shared/services/product.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { environment } from '../../../shared/environment/environment';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent implements OnInit {
  product: Product = new Product();
  environment=environment
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
    const id = Number(this.activatedRoute.snapshot.paramMap.get('productId'));
    this.productService.getById(id).subscribe((req) => {
      this.product = req;
    });
  }
  goToSlide(index: number): void {
    // const carouselElement = document.getElementById('productImageCarousel');
    // const carousel = new bootstrap.Carousel(carouselElement as HTMLElement);
    // carousel.to(index);
  }
  
}

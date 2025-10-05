import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';  
import { ProductService } from '@shared/services/product.service';
import { NotificationService } from '@shared/services/notification.service';
import { environment } from '@shared/environment/environment';
import { ProductResult } from '@models/product';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent implements OnInit {
  product: ProductResult = new ProductResult();
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
    const id :string|null= this.activatedRoute.snapshot.paramMap.get('productId');
    if(id!=null)
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

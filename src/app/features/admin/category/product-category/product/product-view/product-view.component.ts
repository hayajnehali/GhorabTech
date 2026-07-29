import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@shared/services/product.service';
import { ProductResult } from '@models/product';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
  standalone: false,
})
export class ProductViewComponent implements OnInit {
  product: ProductResult = new ProductResult();
  displayedColumns = ['details', 'price', 'priceBeforeDiscount', 'stock', 'available'];

  constructor(
    private productService: ProductService,
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
        }
      });
  }
}

import {
  Component,
  computed,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { ProductFilter, ProductResult } from '@models/product';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-collection-selector',
  standalone: false,
  templateUrl: './product-collection-selector.component.html',
  styleUrl: './product-collection-selector.component.scss',
})
export class ProductCollectionSelectorComponent implements OnInit {
  isModalOpen = model.required<boolean>();
  selectedProducts = model<ProductResult[]>([]);

  products = signal<ProductResult[]>([]);
  searchTerm = signal('');

  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.products();
    return this.products().filter(p =>
      p.name?.local?.toLowerCase().includes(term) ||
      p.name?.english?.toLowerCase().includes(term) ||
      p.name?.arabic?.toLowerCase().includes(term)
    );
  });

  selectedCount = computed(() => this.selectedProducts().length);

  private readonly productService = inject(ProductService);
  private readonly productFilter = new ProductFilter();

  ngOnInit(): void {
    this.productFilter.pageSize = 10000;
    this.loadProducts();
  }

  private loadProducts() {
    this.productService.getAll(this.productFilter).subscribe((products) => {
      this.products.set(products?.items || []);
    });
  }

  onSearchInput(value: string): void {
    this.searchTerm.set(value);
  }

  toggleProductSelection(product: ProductResult): void {
    this.selectedProducts.update(current => {
      const exists = current.some(p => p.id === product.id);
      return exists
        ? current.filter(p => p.id !== product.id)
        : [...current, product];
    });
  }

  isProductSelected(productId: string): boolean {
    return this.selectedProducts().some(p => p.id === productId);
  }

  resetSelection(): void {
    this.selectedProducts.set([]);
  }

  confirmSelection(): void {
    this.isModalOpen.set(false);
  }
}
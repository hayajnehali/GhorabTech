import {
  Component,
  computed,
  inject,
  model,
  OnInit,
  output,
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

  // Output to pass the selected products to the parent component
  productsSelected = output<ProductResult[]>();

  products = signal<ProductResult[]>([]);
  productFilter: ProductFilter = new ProductFilter();

  // Track selected IDs efficiently
  selectedIds = signal<Set<string>>(new Set());

  // Reactively compute the number of selected products
  selectedCount = computed(() => this.selectedIds().size);

  private readonly productService = inject(ProductService);

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts() {
    this.productService.getAll(this.productFilter).subscribe((products) => {
      this.products.set(products?.data || []);
    });
  }

  toggleProductSelection(productId: string): void {
    this.selectedIds.update((currentSet) => {
      const nextSet = new Set(currentSet);
      if (nextSet.has(productId)) {
        nextSet.delete(productId);
      } else {
        nextSet.add(productId);
      }
      return nextSet;
    });
  }

  isProductSelected(productId: string): boolean {
    return this.selectedIds().has(productId);
  }

  resetSelection(): void {
    this.selectedIds.set(new Set());
  }

  confirmSelection(): void {
    // Filter the items that match our selected ID list
    const selectedProductsList = this.products().filter((p:any) =>
      this.selectedIds().has(p.id),
    );
    this.productsSelected.emit(selectedProductsList);
    this.isModalOpen.set(false); // Close modal on success
  }
}

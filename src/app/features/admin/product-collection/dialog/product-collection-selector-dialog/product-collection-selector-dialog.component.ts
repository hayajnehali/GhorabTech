import { Component, computed, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ProductFilter, ProductResult } from '@models/product';
import { ProductService } from '@shared/services/product.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-product-collection-selector-dialog',
  standalone: false,
  templateUrl: './product-collection-selector-dialog.component.html',
  styleUrl: './product-collection-selector-dialog.component.scss',
})
export class ProductCollectionSelectorDialogComponent {
  products = signal<ProductResult[]>([]);
  selectedProducts = signal<ProductResult[]>([]);

  // Pagination State
  totalItems = signal(0);
  pageSize = 6;
  currentPage = 1;

  // Search handling with RxJS debounce to avoid spamming the backend
  private searchSubject = new Subject<string>();
  productFilter = new ProductFilter();

  selectedCount = computed(() => this.selectedProducts().length);

  constructor(
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductCollectionSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedProducts: ProductResult[] },
  ) {
    // Sync initially passed selected products if any
    if (data?.selectedProducts) {
      this.selectedProducts.set([...data.selectedProducts]);
    }
  }

  ngOnInit(): void {
    // Configure filter for 6 products max
    this.productFilter.pageSize = this.pageSize;
    this.productFilter.pageIndex = this.currentPage;

    this.loadProducts();

    // Handle search debouncing
    this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.productFilter.name = searchTerm || null;
        this.productFilter.pageIndex = 1; // Reset to page 1 on new search
        this.loadProducts();
      });
  }

  loadProducts(): void {
    this.productService.getAll(this.productFilter).subscribe((response) => {
      // Assuming your API response maps metadata here (adjust based on your actual API return structure)
      this.products.set(response?.items || []);
      this.totalItems.set(response?.totalCount || response?.items?.length || 0);
    });
  }

  onSearchInput(value: string): void {
    this.searchSubject.next(value.trim());
  }

  onPageChange(event: PageEvent): void {
    this.productFilter.pageIndex = event.pageIndex + 1; // MatPaginator is 0-indexed, FilterBase is 1-indexed
    this.loadProducts();
  }

  toggleProductSelection(product: ProductResult): void {
    this.selectedProducts.update((current) => {
      const exists = current.some((p) => p.id === product.id);
      return exists
        ? current.filter((p) => p.id !== product.id)
        : [...current, product];
    });
  }

  isProductSelected(productId: string): boolean {
    return this.selectedProducts().some((p) => p.id === productId);
  }

  resetSelection(): void {
    this.selectedProducts.set([]);
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  confirmSelection(): void {
    // Send selected products back to the caller component
    this.dialogRef.close(this.selectedProducts());
  }
}

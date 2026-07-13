import { Component, inject } from '@angular/core'; 
import {
  ProductCollectionFilter,
  ProductCollectionRequest,
  ProductCollectionResponse,
} from '../../../../../model/product-collection.model'; 
import { BaseListComponent } from '@core/base/base-ilst-component';
import { ProductCollectionService } from '../../../../../shared/services/product-collection.service';

@Component({
  selector: 'app-search-product-collection',
  standalone: false,
  templateUrl: './search-product-collection.component.html',
  styleUrl: './search-product-collection.component.scss',
})
export class SearchProductCollectionComponent extends BaseListComponent<
  ProductCollectionRequest,
  ProductCollectionResponse,
  ProductCollectionFilter
> {
  constructor(private productCollectionService: ProductCollectionService) {
    super(productCollectionService, ProductCollectionFilter);
  }
 
  // private readonly router = inject(Router);
  private readonly collectionService = inject(ProductCollectionService);

  redirectToAdd(): void {
    this.router.navigateByUrl('admin/product-collection/create');
  }

  viewCollection(item: ProductCollectionResponse): void {
    this.router.navigate(['admin/product-collection/view', item.id]);
  }

  editCollection(item: ProductCollectionResponse): void {
    this.router.navigate(['admin/product-collection/edit', item.id]);
  }

  toggleActive(item: ProductCollectionResponse): void {
    const action = item.isActive
      ? this.collectionService.deactivate(item.id!)
      : this.collectionService.activate(item.id!);
    action.subscribe({
      next: () => {
        this.notificationService.showSuccess(
          this.translate.instant('general.success-message'),
          this.translate.instant('general.success'),
        );
        this.search();
      },
      error: (err) => this.notificationService.showError(err),
    });
  }

  deleteCollection(item: ProductCollectionResponse): void {
    if (
      !confirm(
        this.translate.instant('general.confirm-delete') ||
          'Are you sure you want to delete this collection?',
      )
    ) {
      return;
    }
    this.collectionService.delete(item.id!).subscribe({
      next: () => {
        this.notificationService.showSuccess(
          this.translate.instant('general.success-message'),
          this.translate.instant('general.success'),
        );
        this.search();
      },
      error: (err) => this.notificationService.showError(err),
    });
  }
}

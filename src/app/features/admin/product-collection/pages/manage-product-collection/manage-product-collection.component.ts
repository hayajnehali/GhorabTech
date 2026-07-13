import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductResult } from '@models/product';
import { 
  ProductCollectionItemRequest,
  ProductCollectionRequest,
  ProductCollectionResponse,
} from '../../../../../model/product-collection.model';
import { LocalizedString } from '@core/base/localized-string ';
import { ProductCollectionService } from '../../../../../shared/services/product-collection.service';
import { NotificationService } from '@shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductCollectionSelectorDialogComponent } from '../../dialog/product-collection-selector-dialog/product-collection-selector-dialog.component';

@Component({
  selector: 'app-manage-product-collection',
  templateUrl: './manage-product-collection.component.html',
  styleUrl: './manage-product-collection.component.scss',
  standalone: false,
})
export class ManageProductCollectionComponent implements OnInit {
  isAdd = true;
  loading = signal(false);

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productCollectionService = inject(ProductCollectionService);
  private readonly notificationService = inject(NotificationService);
  private readonly translate = inject(TranslateService);
  private readonly dialog = inject(MatDialog);

  collectionForm = this.fb.group({
    id: '',
    name: this.fb.group({
      english: ['', [Validators.required, Validators.maxLength(100)]],
      arabic: ['', [Validators.required, Validators.maxLength(100)]],
    }),
    description: this.fb.group({
      english: ['', [Validators.maxLength(500)]],
      arabic: ['', [Validators.maxLength(500)]],
    }),
    sortOrder: [0, [Validators.required, Validators.min(0)]],
  });

  productsSelected: ProductResult[] = [];

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.isAdd = false;
      this.loadCollection(id);
    }
  }

  private patchForm(collection: ProductCollectionResponse): void {
    this.collectionForm.patchValue({
      id: collection.id,
      name: collection.name,
      description: collection.description,
      sortOrder: collection.sortOrder,
    });
    this.productsSelected =
      collection.productCollectionItems?.map((i) => this.mapToProductResult(i.product)) || [];
  }

  private loadCollection(id: string): void {
    this.loading.set(true);
    this.productCollectionService.getById(id).subscribe({
      next: (result) => {
        if (!result.data) {
          this.goBack();
        }

        this.patchForm(result.data!);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.notificationService.showError({
          error: 'Failed to load collection',
        } as any);
      },
    });
  }

  save(): void {
    if (this.collectionForm.invalid) {
      this.collectionForm.markAllAsTouched();
      return;
    }

    let payload: ProductCollectionRequest = new ProductCollectionRequest();
    payload.id = !this.isAdd
      ? (this.collectionForm.value.id as string)
      : undefined;
    payload.name = this.collectionForm.value.name as LocalizedString;
    payload.description = this.collectionForm.value
      .description as LocalizedString;
    payload.sortOrder = this.collectionForm.value.sortOrder as number;
    payload.items = this.productsSelected.map((p, index) => {
      let item = new ProductCollectionItemRequest();
      item.productId = p.id!;
      item.sortOrder = index;

      return item;
    });
      this.loading.set(true);

    if (this.isAdd) {
      this.createProductCollection(payload);
    } else {
      this.updateProductCollection(payload);
    }
  }

  private createProductCollection(item: ProductCollectionRequest): void {
    this.productCollectionService.create(item).subscribe({
      next: (result) => {
        if (result.data) {
          this.notificationService.showSuccess(
            this.translate.instant('general.success-message'),
            this.translate.instant('general.success'),
          );
          this.goBack();
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.notificationService.showError(err);
      },
    });
  }

  private updateProductCollection(payload: ProductCollectionRequest): void {
    this.productCollectionService.update(payload).subscribe({
      next: (result) => {
        if (result.data) {
          this.notificationService.showSuccess(
            this.translate.instant('general.success-message'),
            this.translate.instant('general.success'),
          );
          this.goBack();
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.notificationService.showError(err);
      },
    });
  }

  removeProduct(product: ProductResult): void {
    this.productsSelected = this.productsSelected.filter(
      (p) => p.id !== product.id,
    );
  }

  goBack(): void {
    this.router.navigateByUrl('/admin/product-collection');
  }

  private mapToProductResult(source: ProductResult): ProductResult {
    return Object.assign(new ProductResult(), {
      id: source.id,
      productId: Number(source.id),
      name: source.name,
      price: source.price,
      images: source.images ?? [],
    });
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(
      ProductCollectionSelectorDialogComponent,
      {
        width: '1140px', // Matches 'xl' Bootstrap layout specifications
        maxWidth: '95vw',
        data: { selectedProducts: this.productsSelected },
      },
    );

    dialogRef.afterClosed().subscribe((result: ProductResult[] | undefined) => {
      if (result) {
        this.productsSelected = result;
      }
    });
  }
}

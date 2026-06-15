import { Component, inject, OnInit, signal } from '@angular/core';
import { PagedResult } from '@models/results/search-filter';
import {
  ProductCollectionResponse,
  SearchProductCollectionFilter,
} from '../../models/product-collection.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ProductCollectionService } from '../../services/product-collection.service';
import { NotificationService } from '@shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search-product-collection',
  standalone: false,
  templateUrl: './search-product-collection.component.html',
  styleUrl: './search-product-collection.component.scss',
})
export class SearchProductCollectionComponent implements OnInit {
  $searchTrigger: Subject<void> = new Subject<void>();
  filterForm: FormGroup;
  pagedResult = new PagedResult<ProductCollectionResponse>();
  filterVisible = signal(true);

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly collectionService = inject(ProductCollectionService);
  private readonly notificationService = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.filterForm = this.fb.group<SearchProductCollectionFilter>({
      text: '',
    });
  }

  onResetSearch(): void {
    this.$searchTrigger.next();
  }

  toggleFilter(): void {
    this.filterVisible.update(v => !v);
  }

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
        this.$searchTrigger.next();
      },
      error: (err) => this.notificationService.showError(err),
    });
  }

  deleteCollection(item: ProductCollectionResponse): void {
    if (!confirm(this.translate.instant('general.confirm-delete') || 'Are you sure you want to delete this collection?')) {
      return;
    }
    this.collectionService.delete(item.id!).subscribe({
      next: () => {
        this.notificationService.showSuccess(
          this.translate.instant('general.success-message'),
          this.translate.instant('general.success'),
        );
        this.$searchTrigger.next();
      },
      error: (err) => this.notificationService.showError(err),
    });
  }
}

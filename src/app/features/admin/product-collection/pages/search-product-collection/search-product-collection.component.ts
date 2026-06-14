import { Component, inject, OnInit, signal } from '@angular/core';
import { PagedResult } from '@models/results/search-filter';
import {
  ProductCollectionResponse,
  SearchProductCollectionFilter,
} from '../../models/product-collection.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

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

  deleteCollection(item: ProductCollectionResponse): void {
    console.log('Delete collection:', item.id);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductResult } from '@models/product';
import { ProductCollectionRequest } from '../../models/product-collection.model';
import { LocalizedString } from '@core/base/localized-string ';
import { ProductCollectionService } from '../../services/product-collection.service';

@Component({
  selector: 'app-manage-product-collection',
  templateUrl: './manage-product-collection.component.html',
  styleUrl: './manage-product-collection.component.scss',
  standalone: false,
})
export class ManageProductCollectionComponent implements OnInit {
  isAdd = true;

  isModalOpen: boolean = false;
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productCollectionService = inject(ProductCollectionService);

  collectionForm = this.fb.group({
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

  private patchForm(collection: any): void {
    this.collectionForm.patchValue({
      name: collection.name,
      description: collection.description,
      sortOrder: collection.sortOrder,
    });
  }

  private loadCollection(id: string): void {
    // Replace with your actual service call, e.g.:
    // this.collectionService.getById(id).subscribe(data => this.patchForm(data));
    console.log('Loading collection with id:', id);
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  save(): void {
    if (this.collectionForm.invalid) {
      this.collectionForm.markAllAsTouched();
      return;
    }

    const payload: ProductCollectionRequest = {
      name: this.collectionForm.value.name as LocalizedString,
      description: this.collectionForm.value.description as LocalizedString,
      sortOrder: this.collectionForm.value.sortOrder as number,
      items: this.productsSelected.map((p, index) => ({
        productId: p.id!,
        sortOrder: index,
      })),
    };

    if (this.isAdd) {
      console.log('Creating collection with payload:', payload);
      this.createProductCollection(payload);
    } else {
      const id = this.activatedRoute.snapshot.paramMap.get('id')!;
      // this.collectionService.update(id, payload).subscribe(() => this.goBack());
      console.log('Updating:', id, payload);
    }
  }

  private createProductCollection(item: ProductCollectionRequest): void {
    this.productCollectionService.create(item).subscribe({
      next: (result) => {
        if (result.data) {
          console.log('Collection created successfully');
          this.goBack();
        }
      },
    });
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}

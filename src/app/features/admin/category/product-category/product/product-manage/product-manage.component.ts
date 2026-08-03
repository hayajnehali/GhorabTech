import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product, ProductFilter, ProductResult } from '@models/product';
import { ProductService } from '@shared/services/product.service';
import { BaseManageComponent } from '@core/base/base-manage-component';
import { KeyAttributeService } from '@shared/services/key-attribute.service';
import { KeyAttributeFilter, KeyAttributeResult } from '@models/key-attribute';
import {
  ProductVariantDto,
  ProductVariantAttributeDto,
} from '@models/product-variant';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrl: './product-manage.component.scss',
  standalone: false,
})
export class ProductManageComponent extends BaseManageComponent<
  Product,
  ProductResult,
  ProductFilter
> {
  private readonly keyAttributeService = inject(KeyAttributeService);

  keyAttributeList: KeyAttributeResult[] = [];
  selectedAttributeIds: string[] = [];
  variantRows: ProductVariantDto[] = [];
  private variantErrors = new Map<
    ProductVariantDto,
    { price: boolean; stock: boolean }
  >();

  readonly displayedColumns = [
    'index',
    'combination',
    'price',
    'priceBeforeDiscount',
    'stock',
    'action',
  ];

  constructor(private productService: ProductService) {
    super(productService, Product);
  }

  override ngOnInit(): void {
    this.entity.productCategoryId =
      this.activatedRoute.snapshot.paramMap.get('productCategoryid') ??
      undefined;

    const productId = this.activatedRoute.snapshot.paramMap.get('productId');
    if (productId != null) {
      this.isAdd = false;
      this.loadData(productId);
    } else {
      this.isAdd = true;
      this.loadKeyAttributes();
    }
  }

  override onLoadedData(req: any): void {
    if (req.variants?.length > 0) {
      this.rebuildVariantsFromData(req.variants);
    }
  }

  onAttributesChange(): void {
    const existingByKey = new Map<string, ProductVariantDto>();
    this.variantRows.forEach((v) => {
      const key = this.combinationKey(
        v.attributes?.map((a) => a.keyAttributeValueId)
      );
      if (key) existingByKey.set(key, v);
    });
    this.variantRows = this.generateCombinations(existingByKey);
  }

  removeVariantRow(index: number): void {
    if (this.variantRows.length <= 1) {
      this.notificationService.showWarning(
        this.translate.instant('product.at-least-one-variant')
      );
      return;
    }
    this.variantRows.splice(index, 1);
  }

  getCombination(variant: ProductVariantDto): string {
    return (
      variant.attributes
        ?.map((a) => this.resolveValueName(a.keyAttributeValueId))
        .filter(Boolean)
        .join(' + ') ?? ''
    );
  }

  override processData(): void {
    this.entity.variants = this.variantRows;
  }

  override save(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    if (!this.validateVariants()) {
      this.notificationService.showWarning(
        this.translate.instant('product.variant-validation-message')
      );
      return;
    }
    super.save(form);
  }

  hasError(row: ProductVariantDto, field: 'price' | 'stock'): boolean {
    return this.variantErrors.get(row)?.[field] ?? false;
  }

  clearError(row: ProductVariantDto, field: 'price' | 'stock'): void {
    const error = this.variantErrors.get(row);
    if (!error) return;
    error[field] = false;
    if (!error.price && !error.stock) this.variantErrors.delete(row);
  }

  // ── Private Helpers ──────────────────────────────────────

  private loadData(productId: string): void {
    this.subscribe(
      forkJoin({
        attributes: this.keyAttributeService.getAll(new KeyAttributeFilter()),
        product: this.productService.getById(productId),
      }).subscribe(({ attributes, product }) => {
        this.keyAttributeList = attributes.items ?? [];
        const data = Object.assign(new Product(), product.data);
        this.entity = data;
        this.onLoadedData(data);
      })
    );
  }

  private loadKeyAttributes(): void {
    this.subscribe(
      this.keyAttributeService
        .getAll(new KeyAttributeFilter())
        .subscribe((result) => {
          this.keyAttributeList = result.items ?? [];
        })
    );
  }

  private generateCombinations(
    existingByKey: Map<string, ProductVariantDto>
  ): ProductVariantDto[] {
    if (this.selectedAttributeIds.length === 0) return [];

    const valueArrays = this.selectedAttributeIds
      .map((attrId) => this.getAttributeValues(attrId))
      .filter((values) => values.length > 0);

    const combos = this.cartesianProduct(valueArrays);

    return combos.map((combo) => {
      const key = this.combinationKey(combo.map((c) => c.id));
      const existing = existingByKey.get(key);
      const variant = new ProductVariantDto();
      variant.id = existing?.id;
      variant.price = existing?.price ?? 0;
      variant.priceBeforeDiscount = existing?.priceBeforeDiscount;
      variant.stock = existing?.stock ?? 0;
      variant.attributes = combo.map((c) => {
        const attr = new ProductVariantAttributeDto();
        attr.keyAttributeValueId = c.id;
        return attr;
      });
      return variant;
    });
  }

  private getAttributeValues(attrId: string): { id: string; value: string }[] {
    const attr = this.keyAttributeList.find((a) => a.id === attrId);
    return (
      attr?.keyAttributeValues.map((v) => ({
        id: v.id ?? '',
        value: v.value.local ?? v.value.english ?? '',
      })) ?? []
    );
  }

  private resolveValueName(valueId: string): string {
    for (const attr of this.keyAttributeList) {
      const val = attr.keyAttributeValues.find((v) => v.id === valueId);
      if (val) return val.value.local ?? val.value.english ?? '';
    }
    return '';
  }

  private cartesianProduct<T>(arrays: T[][]): T[][] {
    return arrays.reduce(
      (acc, curr) => acc.flatMap((a) => curr.map((b) => [...a, b])),
      [[]] as T[][]
    );
  }

  private combinationKey(valueIds: string[] | undefined): string {
    return (valueIds ?? []).filter(Boolean).sort().join('|');
  }

  private validateVariants(): boolean {
    this.variantErrors.clear();
    let valid = true;
    this.variantRows.forEach((v) => {
      const priceInvalid = v.price == null || isNaN(v.price) || v.price <= 0;
      const stockInvalid = v.stock == null || isNaN(v.stock) || v.stock < 0;
      if (priceInvalid || stockInvalid) {
        this.variantErrors.set(v, {
          price: priceInvalid,
          stock: stockInvalid,
        });
        valid = false;
      }
    });
    return valid;
  }

  private rebuildVariantsFromData(variants: any[]): void {
    const attrIdsSet = new Set<string>();

    this.variantRows = variants.map((v) => {
      const variant = new ProductVariantDto();
      variant.id = v.id;
      variant.price = v.price ?? 0;
      variant.priceBeforeDiscount = v.priceBeforeDiscount;
      variant.stock = v.stock ?? 0;
      variant.attributes = (v.attributes ?? []).map((a: any) => {
        if (a.keyAttributeId) attrIdsSet.add(a.keyAttributeId);
        const attr = new ProductVariantAttributeDto();
        attr.id = a.id;
        attr.keyAttributeValueId = a.keyAttributeValueId;
        return attr;
      });
      return variant;
    });

    this.selectedAttributeIds = Array.from(attrIdsSet);
  }
}

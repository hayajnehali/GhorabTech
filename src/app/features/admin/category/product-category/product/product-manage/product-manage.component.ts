import { Component, inject } from '@angular/core';
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
  sharedPrice: number = 0;
  sharedPriceBeforeDiscount?: number;
  sharedStock: number = 0;

  readonly displayedColumns = [
    'index',
    'combination',
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
    this.variantRows = this.generateCombinations();
  }

  removeVariantRow(index: number): void {
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

  // ── Private Helpers ──────────────────────────────────────

  private loadData(productId: string): void {
    forkJoin({
      attributes: this.keyAttributeService.getAll(new KeyAttributeFilter()),
      product: this.productService.getById(productId),
    }).subscribe(({ attributes, product }) => {
      this.keyAttributeList = attributes.items ?? [];
      const data = Object.assign(new Product(), product.data);
      this.entity = data;
      this.onLoadedData(data);
    });
  }

  private loadKeyAttributes(): void {
    this.keyAttributeService
      .getAll(new KeyAttributeFilter())
      .subscribe((result) => {
        this.keyAttributeList = result.items ?? [];
      });
  }

  private generateCombinations(): ProductVariantDto[] {
    if (this.selectedAttributeIds.length === 0) return [];

    const valueArrays = this.selectedAttributeIds
      .map((attrId) => this.getAttributeValues(attrId))
      .filter((values) => values.length > 0);

    const combos = this.cartesianProduct(valueArrays);

    return combos.map((combo) => {
      const variant = new ProductVariantDto();
      variant.price = this.sharedPrice;
      variant.priceBeforeDiscount = this.sharedPriceBeforeDiscount;
      variant.stock = this.sharedStock;
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

  private rebuildVariantsFromData(variants: any[]): void {
    const attrIdsSet = new Set<string>();

    this.variantRows = variants.map((v) => {
      const variant = new ProductVariantDto();
      variant.id = v.id;
      variant.price = v.price ?? 0;
      variant.priceBeforeDiscount = v.priceBeforeDiscount;
      variant.stock = v.stock ?? 0;
      variant.attributes = (v.attributes ?? []).map((a: any) => {
        attrIdsSet.add(a.keyAttributeId);
        const attr = new ProductVariantAttributeDto();
        attr.id = a.id;
        attr.keyAttributeValueId = a.keyAttributeValueId;
        return attr;
      });
      return variant;
    });

    if (this.variantRows.length > 0) {
      this.sharedPrice = this.variantRows[0].price;
      this.sharedPriceBeforeDiscount = this.variantRows[0].priceBeforeDiscount;
      this.sharedStock = this.variantRows[0].stock;
    }

    this.selectedAttributeIds = Array.from(attrIdsSet);
  }
}

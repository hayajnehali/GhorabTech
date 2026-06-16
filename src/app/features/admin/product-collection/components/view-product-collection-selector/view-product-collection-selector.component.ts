import { Component, input, output } from '@angular/core';
import { ProductResult } from '@models/product';

@Component({
  selector: 'app-view-product-collection-selector',
  standalone: false,
  templateUrl: './view-product-collection-selector.component.html',
  styleUrl: './view-product-collection-selector.component.scss',
})
export class ViewProductCollectionSelectorComponent {
  productsSelected = input<ProductResult[]>();
  onAddProductClicked = output<boolean>();
  onDeleteProduct = output<ProductResult>();


  addProducts = () => {
    this.onAddProductClicked.emit(true);
  };
}

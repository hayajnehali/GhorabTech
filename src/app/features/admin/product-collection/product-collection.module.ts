import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module"; 
import { RouterModule } from "@angular/router";
import { routes } from "./product-collection.routing";
import { ManageProductCollectionComponent } from "./pages/manage-product-collection/manage-product-collection.component";
import { FormErrorComponent } from "@shared/component/form-error/form-error.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalComponent } from "@shared/component/ui/modal/modal.component";
import { ProductCollectionSelectorComponent } from './components/product-collection-selector/product-collection-selector.component';
import { ImageComponent } from "@shared/component/img/image/image.component";
import { ViewProductCollectionSelectorComponent } from './components/view-product-collection-selector/view-product-collection-selector.component'; 
import { SearchProductCollectionComponent } from './pages/search-product-collection/search-product-collection.component'; 
import { ButtonComponent } from "@shared/component/ui/button/button/button.component";
import { ProductCollectionSelectorDialogComponent } from './dialog/product-collection-selector-dialog/product-collection-selector-dialog.component';
import { MatDialogActions, MatDialogModule } from "@angular/material/dialog";

@NgModule({ 
  declarations: [
    ManageProductCollectionComponent,
     ProductCollectionSelectorComponent,
      ViewProductCollectionSelectorComponent,
       SearchProductCollectionComponent, 
       ProductCollectionSelectorDialogComponent,
      ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    FormErrorComponent,
    ModalComponent,
    ImageComponent, 
    ButtonComponent,
    MatDialogActions,
    MatDialogModule
],
  exports: [],
})
export class ProductCollectionModule {}
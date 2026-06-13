import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { AdminModuleRoutingModule } from "../admin-routing.module";
import { RouterModule } from "@angular/router";
import { routes } from "./product-collection.routing";
import { ManageProductCollectionComponent } from "./pages/manage-product-collection/manage-product-collection.component";
import { FormErrorComponent } from "@shared/component/form-error/form-error.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalComponent } from "@shared/component/ui/modal/modal.component";
import { ProductCollectionSelectorComponent } from './components/product-collection-selector/product-collection-selector.component';
import { ImageComponent } from "@shared/component/img/image/image.component";
import { ViewProductCollectionSelectorComponent } from './components/view-product-collection-selector/view-product-collection-selector.component';
import { A11yModule } from "@angular/cdk/a11y";

@NgModule({ 
  declarations: [ManageProductCollectionComponent, ProductCollectionSelectorComponent, ViewProductCollectionSelectorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    FormErrorComponent,
    ModalComponent,
    ModalComponent,
    ImageComponent,
    A11yModule
],
  exports: [],
})
export class ProductCollectionModule {}
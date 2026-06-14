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
import { SearchProductCollectionComponent } from './pages/search-product-collection/search-product-collection.component';
import { GridResultComponent } from "@shared/component/grid-result/grid-result.component";
import { GridColumnDirective, GridExpandedDirective } from "@shared/component/grid-result/components/grid-column.directive";
import { SearchPageComponent } from "@shared/component/search-page/search-page.component";
import { GridResultBodyComponent } from "@shared/component/search-page/components/grid-result-body.component";
import { PageHeaderComponent } from "@shared/component/search-page/components/page-header.component";
import { HeaderActionsComponent } from "@shared/component/search-page/components/header-actions.component";
import { PageFilterComponent } from "@shared/component/search-page/components/page-filter.component";
import { ButtonComponent } from "@shared/component/ui/button/button/button.component";

@NgModule({ 
  declarations: [ManageProductCollectionComponent, ProductCollectionSelectorComponent, ViewProductCollectionSelectorComponent, SearchProductCollectionComponent],
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
    A11yModule,
    GridResultComponent,
    GridColumnDirective,
    GridExpandedDirective,
    SearchPageComponent,
    GridResultBodyComponent,
    PageHeaderComponent,
    HeaderActionsComponent,
    PageFilterComponent,
    ButtonComponent
],
  exports: [],
})
export class ProductCollectionModule {}
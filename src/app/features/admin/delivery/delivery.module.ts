import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { routesDelivery } from './delivery-routing.module';
import { FormErrorComponent } from '@shared/component/form-error/form-error.component';
import { DeliveryManageComponent } from './delivery/delivery-manage/delivery-manage.component';
import { PageHeaderComponent } from "@shared/component/search-page/components/page-header.component";
import { SearchPageComponent } from "@shared/component/search-page/search-page.component";
import { HeaderActionsComponent } from "@shared/component/search-page/components/header-actions.component";
import { ButtonComponent } from "@shared/component/ui/button/button/button.component";
import { PageFilterComponent } from "@shared/component/search-page/components/page-filter.component";
import { GridResultBodyComponent } from "@shared/component/search-page/components/grid-result-body.component";
import { GridColumnDirective, GridExpandedDirective } from "@shared/component/grid-result/components/grid-column.directive"; 
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DeliveryManageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routesDelivery),
    FormErrorComponent,
    PageHeaderComponent,
    SearchPageComponent,
    HeaderActionsComponent,
    ButtonComponent,
    PageFilterComponent,
    GridResultBodyComponent,
    GridColumnDirective,
    GridExpandedDirective,
    ReactiveFormsModule
],
})
export class DeliveryModule {}

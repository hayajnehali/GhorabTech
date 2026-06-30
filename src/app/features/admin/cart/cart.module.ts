import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { routesCart } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { A11yModule } from "@angular/cdk/a11y";
import { CartItemListComponent } from './cart-item-list/cart-item-list.component';
import { ImageComponent } from "@shared/component/img/image/image.component";
import { NoDataComponent } from '@shared/component/no-data/no-data.component';
import { SearchPageComponent } from '@shared/component/search-page/search-page.component';
import { PageHeaderComponent } from '@shared/component/search-page/components/page-header.component';
import { HeaderActionsComponent } from '@shared/component/search-page/components/header-actions.component';
import { PageFilterComponent } from '@shared/component/search-page/components/page-filter.component';
import { GridResultBodyComponent } from '@shared/component/search-page/components/grid-result-body.component';
import { GridColumnDirective } from '@shared/component/grid-result/components/grid-column.directive';
import { ButtonComponent } from '@shared/component/ui/button/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CartListComponent, CartItemListComponent],
  imports: [CommonModule, SharedModule, NoDataComponent, RouterModule.forChild(routesCart), A11yModule, ImageComponent, SearchPageComponent, PageHeaderComponent, HeaderActionsComponent, PageFilterComponent, GridResultBodyComponent, GridColumnDirective, ButtonComponent, ReactiveFormsModule],
})
export class CartModule {}

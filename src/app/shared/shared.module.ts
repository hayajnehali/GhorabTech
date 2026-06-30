import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModuleRoutingModule } from './shared-module-routing.module';
import { MatInputModule } from '@angular/material/input';

import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AboutComponent } from './component/about/about.component';
import { MatRadioModule } from '@angular/material/radio';
import { EmailComponent } from './component/email/email.component';
import { DatePickerComponent } from './component/ui/date/date.component';
import { FormErrorComponent } from './component/form-error/form-error.component';
import { SearchPageComponent } from './component/search-page/search-page.component';
import { HeaderActionsComponent } from './component/search-page/components/header-actions.component';
import { PageHeaderComponent } from './component/search-page/components/page-header.component';
import { PageFilterComponent } from './component/search-page/components/page-filter.component';
import {
  GridColumnDirective,
  GridExpandedDirective,
} from './component/grid-result/components/grid-column.directive';
import { GridResultBodyComponent } from './component/search-page/components/grid-result-body.component';
import { ButtonComponent } from './component/ui/button/button/button.component';
import { TimePickerComponent } from './component/ui/time/time-picker.component';
import { TimeFormatPipe } from './pipe/time-format.pipe';

@NgModule({
  declarations: [ProductCardComponent, AboutComponent, EmailComponent],
  imports: [
    CommonModule,
    // SharedModuleRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    TranslateModule,
    MatRadioModule,
    DatePickerComponent,
    FormErrorComponent,
    PageHeaderComponent,
    SearchPageComponent,
    HeaderActionsComponent,
    ButtonComponent,
    PageFilterComponent,
    GridResultBodyComponent,
    GridColumnDirective,
    GridExpandedDirective,
    ReactiveFormsModule,
    TimePickerComponent,
    TimeFormatPipe,
  ],
  exports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    ProductCardComponent,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    TranslateModule,
    AboutComponent,
    MatRadioModule,
    DatePickerComponent,
    FormErrorComponent,
    PageHeaderComponent,
    SearchPageComponent,
    HeaderActionsComponent,
    ButtonComponent,
    PageFilterComponent,
    GridResultBodyComponent,
    GridColumnDirective,
    GridExpandedDirective,
    ReactiveFormsModule,
    TimePickerComponent,
    TimeFormatPipe,
  ],
  providers: [
    // FormsModule,
    // MatFormFieldModule,
    // MatInputModule,
    // HttpClientModule,provideHttpClient(withFetch())
  ],
})
export class SharedModule {}

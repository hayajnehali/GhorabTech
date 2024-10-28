import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import { SharedModuleRoutingModule } from './shared-module-routing.module';   
import {MatInputModule} from '@angular/material/input';

import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ProductCardComponent } from './component/product-card/product-card.component'; 
import { AdminNavBarComponent } from '../admin/admin-module/admin-nav-bar/admin-nav-bar.component';
@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    SharedModuleRoutingModule,  
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
  ],exports:[  
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    ProductCardComponent,
  ],providers:[
    // FormsModule,
    // MatFormFieldModule,
    // MatInputModule,
    // HttpClientModule,provideHttpClient(withFetch())
  ]

})
export class SharedModule { }

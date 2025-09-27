import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import { SharedModuleRoutingModule } from './shared-module-routing.module';   
import {MatInputModule} from '@angular/material/input';

import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ProductCardComponent } from './component/product-card/product-card.component';  
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';



import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';  
import {MatListModule} from '@angular/material/list'; 
import {MatSelectModule} from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { AboutComponent } from './component/about/about.component';
import {MatRadioModule} from '@angular/material/radio';
@NgModule({
  declarations: [
    ProductCardComponent, 
    AboutComponent
  ],
  imports: [
    CommonModule,
    SharedModuleRoutingModule,  
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
  

  ],exports:[  
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
    MatRadioModule
  ],providers:[
    // FormsModule,
    // MatFormFieldModule,
    // MatInputModule,
    // HttpClientModule,provideHttpClient(withFetch())
  ]

})
export class SharedModule { }

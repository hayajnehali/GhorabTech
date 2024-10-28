import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared-module/shared.module';
import { AdminModule } from './admin/admin-module/admin.module';  
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routes';



@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule, 
    SharedModule,
    RouterModule,
    AppRoutingModule,   
    AdminModule, 
    ],exports:[BrowserModule],bootstrap:[AppComponent], providers: [provideAnimationsAsync()]
})
export class AppModule { }

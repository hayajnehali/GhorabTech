import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared-module/shared.module';
import { AdminModule } from './admin/admin-module/admin.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
    RouterModule,
    AppRoutingModule,
    AdminModule,
    BrowserAnimationsModule, // Required animations module
    ToastrModule.forRoot({
      timeOut: 3000, // Duration of the toast
      positionClass: 'toast-bottom-center', // Position of the toast
      preventDuplicates: true, // Prevent duplicate messages
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [BrowserModule],
  bootstrap: [AppComponent],
  providers: [provideAnimationsAsync()],
})
export class AppModule {}

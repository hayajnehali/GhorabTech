import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core'; 
import { LanguageButtonComponent } from '../language-button/language-button.component';
import { CategoryResult } from '@models/category';
import { ProductCategoryResult } from '@models/product-category';
import { MatMenuModule } from '@angular/material/menu';
import { SpinnerService } from '@shared/services/spinner.service';
import { LoginLogoutButtonComponent } from '../login-logout-button/login-logout-button.component';
import { ResponsiveService } from '@shared/services/responsive.service';
import { MatListItem } from "@angular/material/list"; 
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule,
    LanguageButtonComponent,
    LoginLogoutButtonComponent,
    MatListItem,
    MatExpansionModule
],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() toggleChanged = new EventEmitter<boolean>();
  @Input() categoryResult: CategoryResult[] | undefined = [];
  @Input() productCategories: ProductCategoryResult[] | undefined = [];
  @Input() cartCount: number = 0;
  @Input() cartTotal: number = 0;
  spinnerService = inject(SpinnerService);
  responsiveService = inject(ResponsiveService);
  trackById(index: number, item: any): number {
    return item.id;
  }
 
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-nav-bar', 
  templateUrl: './admin-nav-bar.component.html',
  styleUrl: './admin-nav-bar.component.css'
})
export class AdminNavBarComponent {
  constructor(private router: Router) {}
  goToProductList(){
    this.router.navigate(['admin/products']);
  }
}

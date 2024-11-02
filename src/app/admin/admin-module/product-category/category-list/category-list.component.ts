import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductCategoryService } from '../../../../shared-module/services/product-category.service';
import {
  ProductCategory,
  ProductCategoryFilter,
} from '../../../../model/product-category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'categoryName'];
  dataSource = new MatTableDataSource<ProductCategory>();  
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Declare paginator without initialization
  productCategoryFilter: ProductCategoryFilter=new ProductCategoryFilter();
  totalNumberOf: number=0;

  constructor(
    private productCategoryService: ProductCategoryService,
    private router: Router
  ) {
 
  }
  ngOnInit(): void {
    this.getCategory();
  }
  ngAfterViewInit() {
    this.paginator.pageSize=5
    
    this.dataSource.paginator = this.paginator; // Set the paginator after the view initializes


  }

  getCategory() {
   
    this.productCategoryService
      .getAll( this.productCategoryFilter)
      .subscribe((req) => {
        this.dataSource.data = req.data;  
        this.totalNumberOf=req.totalNumberOf
      });
  }
  goToAdd() {
    this.router.navigate(['admin/categoryManage']);
  }
  goBack() {
    this.router.navigate(['admin/products']);
  }

  pageChanged(event: PageEvent) {
    this.productCategoryFilter.pageIndex = event.pageIndex+1; 
    this.productCategoryFilter.pageSize = event.pageSize;  
    this.getCategory();  
   
  }
}

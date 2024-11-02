import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../shared-module/services/product.service';
import { Product } from '../../../../model/product';
import { FileUploadService } from '../../../../shared-module/services/file-upload.service';
import { ProductCategoryService } from '../../../../shared-module/services/product-category.service';
import { ProductCategory, ProductCategoryFilter } from '../../../../model/product-category';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrl: './product-manage.component.scss'
})
export class ProductManageComponent implements OnInit {
  product: Product = new Product();
  selectedFiles: File[] = [];
  uploadedFileNames: string[] = [];
  categoryList: ProductCategory[]=[];


  constructor(
    private productService: ProductService,
     private fileUploadService: FileUploadService,
     private productCategoryService:ProductCategoryService
    ) {

  }
  ngOnInit(): void {
    this.getCategory()
  }

  onFilesSelected(event: any) {
    const files = event.target.files;
    this.selectedFiles = Array.from(files);
  }


  onSubmit() { 
    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('files', file, file.name); // Append each file
    }); 
    this.fileUploadService.uploadFile(formData).subscribe(
      {
        next: (res) => {
          this.uploadedFileNames = res.fileNames;
        }, complete: () => {  
          this.product.imageUrl="";
        this.uploadedFileNames.forEach((c)=>{
          this.product.imageUrl= this.product.imageUrl+"/&*"+c
          }) 
          this.productService.create(this.product).subscribe()
          console.log(this.uploadedFileNames)
        }
      }
    ) 
  } 
  getImageUrl(fileName: string): string {
    return `https://localhost:44360/assets/${fileName}`; // Adjust this based on where you store images
  }
  getCategory() {
   
    this.productCategoryService
      .getAll(new ProductCategoryFilter())
      .subscribe((req) => {
        this.categoryList= req.data;  
        // this.totalNumberOf=req.totalNumberOf
      });
  }
}


import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router'; 
import { Product } from '../../../model/product';
import { ProductCategory, ProductCategoryFilter } from '../../../model/product-category';
import { environment } from '../../../shared-module/environment/environment';
import { ProductService } from '../../../shared-module/services/product.service';
import { ProductCategoryService } from '../../../shared-module/services/product-category.service';
import { FileUploadService } from '../../../shared-module/services/file-upload.service';
import { NotificationService } from '../../../shared-module/services/notification.service';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrl: './product-manage.component.scss',
})
export class ProductManageComponent implements OnInit {
  product: Product = new Product();
  selectedFiles: File[] = [];
  uploadedFileNames: string[] = [];
  categoryList: ProductCategory[] = [];
  isAdd: boolean = true;
  environment=environment;
  constructor(
    private productService: ProductService,
    private fileUploadService: FileUploadService,
    private productCategoryService: ProductCategoryService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getCategory();
    const id = Number(this.activatedRoute.snapshot.paramMap.get('productId'));
    if (id > 0) {
      this.isAdd = false;
      this.getById(id);
    } else {
      this.isAdd = true;
    }
  }
  getById(id: number) {
    this.productService.getById(id).subscribe({
      next: (req: Product) => {
        this.product = req;
      },error:(error)=>{
this.notificationService.showError(error)
      }
    });
  }
 
  onFilesSelected(event: any) {
    this.product.images=[]
    const files = event.target.files;
    this.selectedFiles = Array.from(files); 
  
    const formData = new FormData();
    this.selectedFiles.forEach((file) => {
      formData.append('files', file, file.name); // Append each file
    });
  
    this.fileUploadService.uploadFile(formData).subscribe({
      next: (res) => { 
        this.product.images = res; // Assuming `res` contains the image data returned from the server
      },
      error: (err) => {
        console.error("File upload failed:", err);
      },
      complete: () => {
        console.log("File upload complete");
      },
    });
  }
  
  onSubmit() {
    if(this.isAdd){
      this.productService.create(this.product).subscribe({
        next: () => {},
        complete: () => {
           this.product = new Product();
           this.notificationService.showSuccess();
        },
        error:(error)=>{
          this.notificationService.showError(error);
        }
      }); 
    }else{
      this.productService.update(this.product).subscribe({
        next: () => {},
        complete: () => { 
           this.notificationService.showSuccess();
        },error:(error)=>{
          this.notificationService.showError(error);
        }
      }); 
    }

  }
  getImageUrl(fileName: string): string {
    return `./assets/projectImg/${fileName}`; // Adjust this based on where you store images
  }
  getCategory() {
    this.productCategoryService
      .getAll(new ProductCategoryFilter())
      .subscribe((req) => {
        this.categoryList = req.data;
        // this.totalNumberOf=req.totalNumberOf
      });
  }
}

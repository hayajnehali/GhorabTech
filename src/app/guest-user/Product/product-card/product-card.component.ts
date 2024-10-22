import { Component, OnInit } from '@angular/core'; 
import { productFilter } from '../../../model/product';
import { ProductService } from '../../../shared-module/services/product.service';
import { error } from 'node:console';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
constructor(private productService:ProductService){

}
  ngOnInit(): void {
   this.getProducts();
  }

  getProducts(){ 
     this.productService.getAll(new productFilter()).subscribe((req)=>{
       console.log(req)
     },error=>{ 
      console.log(error) 
     })
  }
}

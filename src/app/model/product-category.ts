import { ModelBase } from "./base.model"; 
import { FilterBase } from "./filter-base";
import { Product } from "./product";

export class ProductCategory extends ModelBase {
    
    productCategoryId?: number;
    categoryAr?: string;
    categoryEn?: string; 
    category?: string; 
    products:Product[]=[];
      
    
    constructor() {
        super(); 
    }
}


export class ProductCategoryFilter extends FilterBase{
    
}
 
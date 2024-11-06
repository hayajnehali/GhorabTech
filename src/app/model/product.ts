import { ModelBase } from "./base.model";
import { FilterBase } from "./filter-base";

export class Product extends ModelBase {
    productId: number | undefined;
    name?: string;
    nameEn?: string;
    nameAr?: string;
    price?: number;
    count?: number;
    productCategoryId?: number;
    description?: string;
    descriptionEn?: string;
    descriptionAr?: string; 
    images:Images[]=[]
    
    constructor() {
        super();
        // Additional initialization can go here
    }
}


export class ProductFilter extends FilterBase {
    
}
export class Images {
    imageID? :number 
    guidName? :string
    type?:string
    isMain? :boolean 
    productId? :number 
}



// product = {
//     productId: undefined,
//     name: undefined,
//     nameEn: undefined,
//     nameAr: undefined,
//     price: undefined,
//     count: undefined,
//     description: undefined,
//     imageUrl: undefined
// };
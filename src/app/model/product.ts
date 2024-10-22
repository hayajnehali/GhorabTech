import { ModelBase } from "./base.model";

export class Product extends ModelBase {
    productId?: number;
    name?: string;
    nameEn?: string;
    nameAr?: string;
    price?: number;
    count?: number;
    description?: string;
    descriptionEn?: string;
    descriptionAr?: string;
    imageUrl?: string; // Make sure this property is defined
    
    constructor() {
        super();
        // Additional initialization can go here
    }
}


export class ProductFilter {
    
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
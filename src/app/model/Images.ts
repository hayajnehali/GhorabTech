class Images { 
  guidName?: string;
  type?: string;
  isMain?: boolean;
}
export class ProductImage extends Images {
  productId?: string;
}
export class CategoryImage  extends Images{
  CategoryId?: string;
}

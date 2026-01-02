import { OrderByEnum } from "@shared/Enum/order-by-enum";

export class FilterBase {
    pageIndex:number=1
    pageSize:number=5 
    currentPage:number=1 
    sortBy?: string ;
    orderBy:OrderByEnum = OrderByEnum.Asc; 
    constructor(){
        this.pageIndex=1
        this.pageSize=5
        this.currentPage=1
    }
}
export class FilterBase {
    pageIndex:number=1
    pageSize:number=5 
    currentPage:number=1 
    constructor(){
        this.pageIndex=1
        this.pageSize=5
        this.currentPage=1
    }
}